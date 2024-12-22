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
exports.getLastTrajectory = exports.getAllTrajectories = exports.sendTrajectoriesReport = exports.getLastTrajectories = exports.getTrajectoriesByIdAndDate = void 0;
const client_1 = require("@prisma/client");
const date_1 = require("../utils/date");
const excel_1 = __importDefault(require("../utils/excel"));
const gmail_1 = require("../utils/gmail");
const pagination_1 = require("../utils/pagination");
const trajectories_1 = require("../servicies/trajectories");
const lastTrajectories_1 = require("../servicies/lastTrajectories");
const prisma = new client_1.PrismaClient();
const getTrajectoriesByIdAndDate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taxi_id, date } = req.query;
        const { page, limit, startIndex } = (0, pagination_1.pagination)(req.query.page, req.query.limit);
        console.log("page", req.query);
        console.log("Page parameter:", req.query["page"]);
        let startOfDay = null;
        let endOfDay = null;
        if (date && date !== "") {
            const { startOfDay: start, endOfDay: end } = (0, date_1.getStartAndEndOfDay)(date);
            startOfDay = start;
            endOfDay = end;
        }
        const filters = {};
        if (taxi_id && taxi_id !== "") {
            filters.taxi_id = Number(taxi_id); // Convertir taxi_id a número
        }
        if (startOfDay && endOfDay) {
            filters.startOfDay = startOfDay;
            filters.endOfDay = endOfDay;
        }
        if (Object.keys(filters).length === 0) {
            return res.status(400).json({ message: "Debe proporcionar al menos un parámetro (taxi_id o date)" });
        }
        const trajectories = yield (0, trajectories_1.trajectoriesData)(startIndex, limit, filters.taxi_id, filters.startOfDay, filters.endOfDay);
        if (trajectories.length > 0) {
            return res.status(200).json({
                data: trajectories,
                page: page,
                limit: limit,
            });
        }
        else {
            return res.status(404).json({ message: "No se encontraron datos" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
});
exports.getTrajectoriesByIdAndDate = getTrajectoriesByIdAndDate;
const getLastTrajectories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, startIndex } = (0, pagination_1.pagination)(req.body.page, req.body.limit);
    try {
        const lastTrajectories = yield (0, lastTrajectories_1.lastTrajectoriesDates)(startIndex, limit);
        return res.status(200).json({
            pageLastTrajectories: lastTrajectories,
            page: page,
            limit: limit,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ message: "Error interno del servidor", error });
    }
});
exports.getLastTrajectories = getLastTrajectories;
// filtra por taxi_id y date
const sendTrajectoriesReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taxi_id, date, email } = req.body;
        const { startOfDay, endOfDay } = (0, date_1.getStartAndEndOfDay)(date);
        console.log("Start of Day:", startOfDay);
        console.log("End of Day:", endOfDay);
        if (!taxi_id || !date || date === "" || taxi_id === "") {
            return res.status(400).json({ message: "Dato no insertado" });
        }
        const trajectoriesData = yield prisma.trajectories.findMany({
            where: {
                date: {
                    gte: startOfDay,
                    lt: endOfDay,
                },
                taxi_id: Number(taxi_id),
            },
            orderBy: { id: "asc" },
        });
        if (trajectoriesData.length > 0) {
            const formattedTrajectories = trajectoriesData.map((trajectory) => {
                return Object.assign(Object.assign({}, trajectory), { 
                    // Convertir la fecha a formato UTC
                    date: trajectory.date ? new Date(trajectory.date).toISOString() : null });
            });
            // transforma el res en excel y crea un archivo xlsx
            const fileName = `trajectories_${taxi_id}_${date}.xlsx`;
            console.log("fileName", fileName);
            const filePath = (0, excel_1.default)(formattedTrajectories, fileName);
            // Establece el tipo de contenido como un archivo Excel
            res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
            res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
            yield gmail_1.transporter.sendMail({
                from: "educ.dana@gmail.com",
                to: email,
                subject: "Trajectorias",
                text: `Lista de trajectorias del taxi ${taxi_id}`,
                attachments: [
                    {
                        filename: fileName,
                        path: filePath,
                    },
                ],
            });
            res.status(200).json({ message: "Archivo enviado correctamente" });
            return filePath;
        }
        else {
            return res.status(404).json({ message: "No se encontraron datos" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
});
exports.sendTrajectoriesReport = sendTrajectoriesReport;
const getAllTrajectories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page, limit, startIndex } = (0, pagination_1.pagination)(req.query.page, req.query.limit);
        let whereOptions = {};
        const trajectoriesData = yield prisma.trajectories.findMany({
            where: whereOptions,
            skip: startIndex,
            take: limit,
            orderBy: { id: "asc" },
        });
        if (trajectoriesData.length > 0) {
            return res.status(200).json({
                data: trajectoriesData,
                page: page,
                limit: limit,
            });
        }
        else {
            return res.status(404).json({ message: "No se encontraron datos" });
        }
    }
    catch (error) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
});
exports.getAllTrajectories = getAllTrajectories;
const getLastTrajectory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hola");
    const { taxi_id } = req.query;
    if (!taxi_id) {
        return res.status(400).json({ message: "Faltan datos" });
    }
    const taxi = yield prisma.taxis.findUnique({
        where: {
            id: parseInt(taxi_id),
        },
    });
    const lastTrajectorie = yield prisma.trajectories.findFirst({
        where: {
            taxi_id: Number(taxi_id),
        },
        orderBy: {
            id: "desc",
        },
    });
    if (!taxi) {
        return res.status(404).json({ message: "Taxi no encontrado" });
    }
    const dataLastTrajectorie = Object.assign({ plate: taxi.plate }, lastTrajectorie);
    return res.status(200).json({ dataLastTrajectorie });
});
exports.getLastTrajectory = getLastTrajectory;
