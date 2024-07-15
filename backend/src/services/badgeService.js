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
exports.createBadge = createBadge;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const qrcode_1 = __importDefault(require("qrcode"));
function createBadge(profileImgUrl, badgeName, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const __dirname = path_1.default.resolve();
        const baseCardPath = path_1.default.join(__dirname, 'public', 'BaseCard.png');
        const formatedName = formatName(badgeName);
        const profileImageBuffer = yield axios_1.default.get(profileImgUrl, { responseType: 'arraybuffer' }).then(res => Buffer.from(res.data));
        const baseCard = (0, sharp_1.default)(baseCardPath);
        const baseCardMetadata = yield baseCard.metadata();
        if (!baseCardMetadata) {
            throw new Error('Failed to read base card metadata');
        }
        const profileImage = yield (0, sharp_1.default)(profileImageBuffer).toBuffer();
        const compositeImage = yield baseCard
            .composite([{
                input: profileImage,
                top: 305,
                left: 195,
                gravity: 'center'
            }])
            .toBuffer();
        const qrCodeBuffer = yield qrcode_1.default.toBuffer(id.toString(), {
            errorCorrectionLevel: 'H',
            margin: 1,
            width: 200,
            color: {
                dark: '#000000',
                light: '#FFFFFF'
            }
        });
        // Adiciona o QR Code no final da imagem
        const final = yield (0, sharp_1.default)(compositeImage)
            .composite([{
                input: Buffer.from(`<svg width="${baseCardMetadata.width}" height="800">
          <text font-family="Arial" x="50%" y="50%" font-size="50" text-anchor="middle" alignment-baseline="middle" fill="black">${formatedName}</text>
        </svg>`),
                gravity: 'south'
            }])
            .toBuffer();
        const finalWithQRCode = yield (0, sharp_1.default)(final)
            .composite([{
                input: qrCodeBuffer,
                top: 900,
                left: 260,
                gravity: 'north',
            }])
            .toBuffer();
        return finalWithQRCode;
    });
}
function formatName(name) {
    let finalName = name;
    const names = name.split(' ');
    if (names.length > 2) {
        finalName = `${names[0]} ${names[names.length - 1]}`;
        if (finalName.length > 20) {
            finalName = `${names[0]} ${names[names.length - 1].charAt(0)}.`;
        }
    }
    if (finalName.length > 20) {
        finalName = finalName.substring(0, 20);
    }
    return finalName;
}
