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
exports.getUserById = exports.getBadgeByUserId = exports.deleteUser = exports.editUser = exports.createUser = exports.getUsers = exports.login = void 0;
const client_1 = require("@prisma/client");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const awsService_1 = require("../services/awsService");
const prisma = new client_1.PrismaClient();
dotenv_1.default.config();
const secretKey = process.env.JWT_SECRET_KEY;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Credenciais inválidas.' });
        }
        if (!secretKey) {
            throw new Error('Chave secreta JWT não está definida.');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, secretKey);
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao realizar login.' });
    }
});
exports.login = login;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json(users);
});
exports.getUsers = getUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, level, profile_img } = req.body;
    // Hash da senha usando bcrypt
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10); // 10 é o custo de hashing
    try {
        const user = yield prisma.user.create({
            data: {
                profile_img,
                name,
                email,
                password: hashedPassword,
                level
            },
        });
        const badge = yield (0, awsService_1.postBadgeImg)(profile_img, name, user.id);
        yield prisma.badge.create({
            data: {
                badge_url: badge,
                user_id: user.id
            }
        });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário.' });
    }
});
exports.createUser = createUser;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email, password, level, profile_img } = req.body;
    try {
        // Verifica se a senha foi fornecida para alteração
        let dataToUpdate = { name, email, level, profile_img };
        if (password) {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10); // Hash da nova senha
            dataToUpdate.password = hashedPassword;
        }
        const updatedUser = yield prisma.user.update({
            where: { id },
            data: dataToUpdate,
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error('Erro ao editar usuário:', error);
        res.status(500).json({ error: 'Erro ao editar usuário.' });
    }
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        yield prisma.user.delete({ where: { id } });
        res.json({ message: 'Usuário deletado com sucesso.' });
    }
    catch (error) {
        console.error('Erro ao deletar usuário:', error);
        res.status(500).json({ error: 'Erro ao deletar usuário.' });
    }
});
exports.deleteUser = deleteUser;
const getBadgeByUserId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const badge = yield prisma.badge.findFirst({ where: { user_id: id } });
        if (!badge) {
            return res.status(404).json({ message: 'Badge não encontrada.' });
        }
        res.json(badge);
    }
    catch (error) {
        console.error('Erro ao buscar badge:', error);
        res.status(500).json({ error: 'Erro ao buscar badge.' });
    }
});
exports.getBadgeByUserId = getBadgeByUserId;
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield prisma.user.findUnique({ where: { id: id } });
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        res.json(user);
    }
    catch (error) {
        console.error('Erro ao buscar usuário:', error);
        res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
});
exports.getUserById = getUserById;
