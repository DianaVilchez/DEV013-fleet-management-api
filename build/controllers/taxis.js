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
exports.getDataTaxis = void 0;
const client_1 = require("@prisma/client");
const error_1 = require("../utils/error");
const prisma = new client_1.PrismaClient();
// module.exports = {
const getDataTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //implementacion de paginacion 
        // se tiene que especificar el tipo en req.query._page y req.query._limit
        const lastId = parseInt(req.query.lastId, 10) || 0; // Página actual
        const limit = parseInt(req.query.limit, 10) || 10; // Tamaño de página
        // Recuperar los usuarios de la página actual
        //findMany: obtener todos los datos
        const taxisData = yield prisma.taxis.findMany({
            // where: {
            //     id:{
            //     gt: page
            // }
            //   },
            cursor: lastId ? { id: Number(lastId) } : undefined,
            skip: lastId ? 1 : 0, // Omitir el registro actual del cursor para empezar después de este
            take: limit, // Obtener solo la cantidad especificada de registros
            orderBy: {
                id: 'asc' // Asegúrate de que los resultados estén ordenados
            },
            // Aquí puedes agregar más condiciones de filtrado, etc.
        });
        // const currentPageTaxis = taxisData.slice(startIndex, startIndex + limit);
        // Enviar resultados al cliente
        //  return res.status(200).json(currentPageTaxis);
        return res.status(200).json({
            data: taxisData, // los registros solicitados
            nextCursor: taxisData.length > 0 ? taxisData[taxisData.length - 1].id : null, // el ID para la próxima solicitud de paginación
            limit: limit,
        });
    }
    catch (e) {
        //   return res.status(500).json(e) ;
        return (0, error_1.handleHttp)(res, 'Error en el servidor');
    }
});
exports.getDataTaxis = getDataTaxis;
