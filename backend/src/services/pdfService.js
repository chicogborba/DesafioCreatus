"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePDF = void 0;
const client_1 = require("@prisma/client");
const pdfkit_1 = __importDefault(require("pdfkit"));
const prisma = new client_1.PrismaClient();
const generatePDF = () => __awaiter(void 0, void 0, void 0, function* () {
    // Lógica para buscar dados do banco de dados usando Prisma
    const users = yield prisma.user.findMany();
    const doc = new pdfkit_1.default();
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
});
exports.generatePDF = generatePDF;
const addEllipsis = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
};
