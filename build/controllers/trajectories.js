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
exports.getTrajectories = void 0;
const client_1 = require("@prisma/client");
const error_1 = require("../utils/error");
const prisma = new client_1.PrismaClient();
// module.exports = {
const getTrajectories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taxi_id, date } = req.query;
        const lastId = parseInt(req.query.lastId, 10) || 0; // Página actual
        const limit = parseInt(req.query.limit, 10) || 10; // Tamaño de página
        console.log(taxi_id);
        console.log(date);
        let trajectoriesData;
        if (date) {
            const dateList = new Date(date);
            console.log("hola");
            //obtener las 24 horas del dia 
            //getFullYear():obtiene el año,getMonth():el mes,getDate():el dia
            //endofday tiene que ser un dia mas , ya que marca el limite de la fecha
            const starOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate()));
            const endOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate() + 1));
            console.log(starOfDay);
            trajectoriesData = yield prisma.trajectories.findMany({
                where: {
                    // taxi_id: Number(taxi_id), // Convertir a número si es necesario
                    date: {
                        gte: starOfDay,
                        lt: endOfDay,
                    } // Asegurarse de que la fecha sea válida
                },
                take: limit,
                cursor: lastId ? { id: Number(lastId) } : undefined,
                skip: lastId ? 1 : 0, // Omitir el registro actual del cursor para empezar después de este
                orderBy: {
                    id: 'asc'
                }
            });
            console.log("hola2");
            console.log(trajectoriesData);
            if (trajectoriesData.length > 0) {
                return res.status(200).json({
                    data: trajectoriesData, // los registros solicitados
                    nextCursor: trajectoriesData.length > 0 ? trajectoriesData[trajectoriesData.length - 1].id : null, // el ID para la próxima solicitud de paginación
                    limit: limit,
                });
            }
            return res.status(404).json({ message: "No se encontraron datos" });
        }
        if (taxi_id) {
            trajectoriesData = yield prisma.trajectories.findMany({
                where: {
                    taxi_id: Number(taxi_id), // Convertir a número si es necesario
                },
                take: limit,
                cursor: lastId ? { id: Number(lastId) } : undefined,
                skip: lastId ? 1 : 0, // Omitir el registro actual del cursor para empezar después de este
                orderBy: {
                    id: 'asc'
                }
            });
            console.log(trajectoriesData);
            if (trajectoriesData.length > 0) {
                return res.status(200).json({
                    data: trajectoriesData, // los registros solicitados
                    nextCursor: trajectoriesData.length > 0 ? trajectoriesData[trajectoriesData.length - 1].id : null, // el ID para la próxima solicitud de paginación
                    limit: limit,
                });
            }
            return res.status(404).json({ message: "No se encontraron datos" });
        }
        if (!taxi_id || !date) {
            return res.status(400).json({ message: "Faltan datos" });
        }
    }
    catch (error) {
        return (0, error_1.handleHttp)(res, "Error en el servidor");
    }
});
exports.getTrajectories = getTrajectories;
