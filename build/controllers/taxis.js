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
exports.getAllTaxis = exports.getDataTaxis = void 0;
const client_1 = require("@prisma/client");
const pagination_1 = require("../utils/pagination");
// import { handleHttp } from '../utils/error';
const alltaxis_1 = require("../servicies/alltaxis");
// const prisma = new PrismaClient()
const prisma = new client_1.PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});
// module.exports = {
const getDataTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plate, taxi_id } = req.query;
        if (plate) {
            const taxiPlate = yield prisma.taxis.findFirst({
                where: {
                    plate: plate
                }
            });
            if (!taxiPlate) {
                return res.status(404).json({ message: "Taxi no encontrado" });
            }
            return res.status(200).json(taxiPlate);
        }
        if (taxi_id) {
            const taxiId = yield prisma.taxis.findUnique({
                where: {
                    id: parseInt(taxi_id)
                }
            });
            if (!taxiId) {
                return res.status(404).json({ message: "Taxi no encontrado" });
            }
            return res.status(200).json(taxiId);
        }
        return res.status(400).json({ message: "Dato no insertado" });
    }
    catch (e) {
        return res.status(500).json({ message: "Error en el servidor" });
        //  return handleHttp(res,'Error en el servidor')
    }
});
exports.getDataTaxis = getDataTaxis;
const getAllTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, startIndex } = (0, pagination_1.pagination)(req.body.page, req.body.limit);
        // por que este codigo no funciona???
        // if (page <= 0 || limit <= 0) {
        //     return res.status(404).json({ message: "Página no encontrada" });
        // }
        const taxisData = yield (0, alltaxis_1.allTaxisData)(prisma, startIndex, limit);
        if (taxisData.length > 0) {
            return res.status(200).json({
                data: taxisData, // los registros solicitados
                page: page,
                limit: limit
            });
        }
        else {
            return res.status(404).json({ message: "No se encontraron datos" });
        }
    }
    catch (e) {
        return res.status(500).json({ message: "Error en el servidor" });
        //  return handleHttp(res,'Error en el servidor')
    }
});
exports.getAllTaxis = getAllTaxis;
