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
exports.deletePlace = exports.editPlace = exports.createPlace = exports.getPlaces = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const places = yield prisma.place.findMany();
    res.json(places);
});
exports.getPlaces = getPlaces;
const createPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { description, acessLevel } = req.body;
    const acessLevelNumber = parseInt(acessLevel);
    const place = yield prisma.place.create({
        data: {
            description,
            acessLevel: acessLevelNumber,
        },
    });
    res.json(place);
});
exports.createPlace = createPlace;
const editPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description, acessLevel } = req.body;
    const place = yield prisma.place.update({
        where: { id: id },
        data: {
            description,
            acessLevel
        },
    });
    res.json(place);
});
exports.editPlace = editPlace;
const deletePlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.place.delete({
        where: { id: id }
    });
    res.json({ message: "Place deleted" });
});
exports.deletePlace = deletePlace;
