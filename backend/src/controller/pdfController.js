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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPDFReport = void 0;
const pdfService_1 = require("../services/pdfService");
const getPDFReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const pdfDoc = yield (0, pdfService_1.generatePDF)();
        // Configurar o response para enviar um PDF
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');
        pdfDoc.pipe(res); // Enviar o PDF no response
        pdfDoc.end(); // Finalizar a escrita do PDF
    }
    catch (error) {
        res.status(500).send('Erro ao gerar o PDF');
    }
});
exports.getPDFReport = getPDFReport;
