import { generateUploadURL } from "../services/awsService";
import { Request, Response } from "express";


export const getS3SignedUrl = async (req: Request, res: Response) => {
  try {
    const uploadURL = await generateUploadURL();
    res.status(200).json({ uploadURL });
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}