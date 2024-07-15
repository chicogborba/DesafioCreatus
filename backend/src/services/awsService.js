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
exports.generateUploadURL = generateUploadURL;
exports.postBadgeImg = postBadgeImg;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const crypto_1 = require("crypto");
const dotenv_1 = __importDefault(require("dotenv"));
const badgeService_1 = require("./badgeService");
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const region = "us-east-2";
const bucketName = "demo-creatus";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const s3 = new aws_sdk_1.default.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4',
});
function generateUploadURL() {
    return __awaiter(this, void 0, void 0, function* () {
        const rawBytes = (0, crypto_1.randomBytes)(16);
        const imageName = rawBytes.toString('hex');
        const params = ({
            Bucket: bucketName,
            Key: imageName,
            Expires: 60,
        });
        const uploadURL = s3.getSignedUrlPromise('putObject', params);
        return uploadURL;
    });
}
function postBadgeImg(profileImgUrl, badgeName, id) {
    return __awaiter(this, void 0, void 0, function* () {
        // Cria o badge e obtém o buffer da imagem
        const badgeBuffer = yield (0, badgeService_1.createBadge)(profileImgUrl, badgeName, id);
        // Gera a URL de upload para o S3
        const url = yield generateUploadURL();
        // Envia o buffer da imagem para o S3 usando a URL de upload
        yield axios_1.default.put(url, badgeBuffer, {
            headers: {
                'Content-Type': 'image/png',
            },
        });
        return url.split('?')[0];
    });
}
