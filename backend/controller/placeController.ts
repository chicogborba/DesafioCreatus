import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient()

export const getPlaces = async (req: Request, res: Response) => {
  const places = await prisma.place.findMany()
  res.json(places)
}

export const createPlace = async (req: Request, res: Response) => {
  const { description, acessLevel } = req.body
  const acessLevelNumber = parseInt(acessLevel)
  const place = await prisma.place.create({
    data: {
      description,
      acessLevel: acessLevelNumber,
    },
  })
  res.json(place)
}

export const editPlace = async (req: Request, res: Response) => {
  const { id } = req.params
  const { description, acessLevel } = req.body
  const place = await prisma.place.update({
    where: { id: id },
    data: {
      description,
      acessLevel
    },
  })
  res.json(place)
}

export const deletePlace = async (req: Request, res: Response) => {
  const { id } = req.params
  await prisma.place.delete({
    where: { id: id }
  })
  res.json({ message: "Place deleted" })
}

