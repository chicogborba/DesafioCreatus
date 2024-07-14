import { Router } from "express";
import { getPDFReport } from "../controller/pdfController";


const router = Router();

router.get('/pdf-report', getPDFReport);

export default router;