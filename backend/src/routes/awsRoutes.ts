import { Router } from "express";
import { getS3SignedUrl } from "../controller/awsController";


const router = Router();

router.get('/s3-link', getS3SignedUrl);

export default router;