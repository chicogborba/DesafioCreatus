import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
  const { name, email, password, level } = req.body;

  // Hash da senha usando bcrypt
  const hashedPassword = await bcrypt.hash(password, 10); // 10 é o custo de hashing

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        level
      },
    });
  
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
}

export const editUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, password, level } = req.body;

  try {
    // Verifica se a senha foi fornecida para alteração
    let dataToUpdate: any = { name, email, level };
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
