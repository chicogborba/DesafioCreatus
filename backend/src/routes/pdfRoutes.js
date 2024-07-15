"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pdfController_1 = require("../controller/pdfController");
const router = (0, express_1.Router)();
router.get('/pdf-report', pdfController_1.getPDFReport);
exports.default = router;
