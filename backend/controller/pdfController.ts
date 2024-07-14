import { Request, Response } from "express";
import { generatePDF } from "../services/pdfService";


export const getPDFReport = async (req:Request, res:Response) => {
  try {
    const pdfDoc = await generatePDF();

    // Configurar o response para enviar um PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');

    pdfDoc.pipe(res); // Enviar o PDF no response
    pdfDoc.end(); // Finalizar a escrita do PDF
  } catch (error) {
    res.status(500).send('Erro ao gerar o PDF');
  }
};