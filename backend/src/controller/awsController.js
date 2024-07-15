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
exports.getS3SignedUrl = void 0;
const awsService_1 = require("../services/awsService");
const getS3SignedUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uploadURL = yield (0, awsService_1.generateUploadURL)();
        res.status(200).json({ uploadURL });
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
exports.getS3SignedUrl = getS3SignedUrl;
