"use strict";
// middlewares/authenticate.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET_KEY;
const authenticate = ((req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (secretKey !== undefined)
            jsonwebtoken_1.default.verify(token, secretKey, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                req.user = user;
                next();
            });
    }
    else {
        res.sendStatus(401);
    }
});
exports.default = authenticate;
