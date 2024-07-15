import aws from 'aws-sdk';
import { randomBytes } from "crypto";
import dotenv from 'dotenv';

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