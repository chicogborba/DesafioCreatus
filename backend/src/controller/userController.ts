import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { postBadgeImg } from "../services/awsService";

const prisma = new PrismaClient()

dotenv.config();
const secretKey = process.env.JWT_SECRET_KEY;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    if (!secretKey) {
      throw new Error('Chave secreta JWT não está definida.');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao realizar login.' });
  }
}


export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany()
  res.json(users)
}

export const createUser = async (req: Request, res: Response) => {
  const { name, email, password, level, profile_img } = req.body;

  // Hash da senha usando bcrypt
  const hashedPassword = await bcrypt.hash(password, 10); // 10 é o custo de hashing

  try {
    const user = await prisma.user.create({
      data: {
        profile_img,
        name,
        email,
        password: hashedPassword,
        level
      },
    });
    const badge = await postBadgeImg(profile_img, name, user.id);
    await prisma.badge.create({
      data: {
        badge_url: badge,
        user_id: user.id
      }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
}

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, level, profile_img} = req.body;

  try {
    // Verifica se a senha foi fornecida para alteração
    let dataToUpdate: any = { name, email, level, profile_img };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10); // Hash da nova senha
      dataToUpdate.password = hashedPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: dataToUpdate,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    res.status(500).json({ error: 'Erro ao editar usuário.' });
  }
}


export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    res.json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário.' });
  }
}

export const getBadgeByUserId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const badge = await prisma.badge.findFirst({ where: { user_id: id } });
    if (!badge) {
      return res.status(404).json({ message: 'Badge não encontrada.' });
    }
    res.json(badge);
  } catch (error) {
    console.error('Erro ao buscar badge:', error);
    res.status(500).json({ error: 'Erro ao buscar badge.' });
  }
}

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
}





