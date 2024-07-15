import aws from 'aws-sdk';
import { randomBytes } from "crypto";
import dotenv from 'dotenv';
import { createBadge } from "./badgeService";
import axios from "axios";

dotenv.config();

const region = "us-east-2"
const bucketName = "demo-creatus"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
});

export async function generateUploadURL () {
  const rawBytes = randomBytes(16);
  const imageName = rawBytes.toString('hex');

  const params = ({
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  });

  const uploadURL = s3.getSignedUrlPromise('putObject', params);
  return uploadURL;
}

export async function postBadgeImg(profileImgUrl: string, badgeName: string, id: string | number) {
  // Cria o badge e obtém o buffer da imagem
  const badgeBuffer = await createBadge(profileImgUrl, badgeName, id);

  // Gera a URL de upload para o S3
  const url = await generateUploadURL();

  // Envia o buffer da imagem para o S3 usando a URL de upload
  await axios.put(url, badgeBuffer, {
    headers: {
      'Content-Type': 'image/png',
    },
  });

  return url.split('?')[0];
}