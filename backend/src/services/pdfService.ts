import { PrismaClient } from "@prisma/client";
import PDFDocument from "pdfkit";

const prisma = new PrismaClient();

export const generatePDF = async () => {
  // Lógica para buscar dados do banco de dados usando Prisma
  const users = await prisma.user.findMany();

  const doc = new PDFDocument();
  
  // Adiciona o título do relatório
  doc.fontSize(12).text('Relatório de Usuários', { align: 'center' });
  doc.moveDown();

  // Definir as variáveis da tabela
  const tableTop = 100;
  const columnTitles = ['Nome', 'Email', 'Nível'];
  const columnSpacing = 220;
  const rowSpacing = 20;
  const pageHeight = doc.page.height;
  const margin = 50;
  const availableHeight = pageHeight - tableTop - margin;

  // Desenha os títulos das colunas
  const drawTableHeaders = () => {
    doc.font('Helvetica-Bold'); // Define a fonte em negrito
    columnTitles.forEach((title, index) => {
      doc.text(title, 50 + index * columnSpacing, tableTop);
    });
    doc.font('Helvetica'); // Retorna para a fonte padrão
  };

  drawTableHeaders();

  let currentHeight = tableTop + rowSpacing;

  // Desenha as linhas da tabela
  users.forEach((user, rowIndex) => {
    const y = tableTop + (rowIndex + 1) * rowSpacing;

    if (currentHeight > availableHeight) {
      doc.addPage();
      drawTableHeaders();
      currentHeight = tableTop + rowSpacing;
    }

    doc.text(addEllipsis(user.name || "", 35), 50, currentHeight);
    doc.text(addEllipsis(user.email, 35), 50 + columnSpacing, currentHeight);
    doc.text(user.level.toString(), 50 + 2 * columnSpacing, currentHeight);

    currentHeight += rowSpacing;
  });

  return doc;
};

const addEllipsis = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }

  return text;
};