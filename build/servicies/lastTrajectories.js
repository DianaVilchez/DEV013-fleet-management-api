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
exports.lastTrajectoriesDates = void 0;
//CODIGO SQL
const client_1 = require("@prisma/client");
// const prisma = new PrismaClient({
//   log: ['query', 'info', 'warn', 'error'],
// })
const prisma = new client_1.PrismaClient();
const lastTrajectoriesDates = (startIndex, limit) => __awaiter(void 0, void 0, void 0, function* () {
    //   const result = await prisma.$queryRaw`
    //   SELECT t.taxi_id AS "taxiId",
    //          tx.plate AS "plate",
    //          t.date AS "date",
    //          t.latitude AS "latitude",
    //          t.longitude AS "longitude"
    //   FROM trajectories t
    //   JOIN (
    //       SELECT taxi_id, MAX(date) AS max_date
    //       FROM trajectories
    //       GROUP BY taxi_id
    //   ) AS latest_dates ON t.taxi_id = latest_dates.taxi_id AND t.date = latest_dates.max_date
    //   JOIN taxis tx ON t.taxi_id = tx.id
    // `;
    // return result;
    const lastTrajectories = yield prisma.$queryRaw `
      WITH LastTrajectories AS (
          SELECT 
              taxi_id, 
              MAX(date) AS last_date
          FROM 
              trajectories
          GROUP BY 
              taxi_id
      )
      SELECT 
          t.taxi_id, 
          ta.plate,
          t.date AS last_date,
          t.latitude,
          t.longitude
      FROM 
          trajectories t
      JOIN 
          LastTrajectories lt ON t.taxi_id = lt.taxi_id AND t.date = lt.last_date
      JOIN 
          taxis ta ON t.taxi_id = ta.id
      LIMIT ${limit} OFFSET ${startIndex}
      
    `;
    return lastTrajectories;
});
exports.lastTrajectoriesDates = lastTrajectoriesDates;
// import { PrismaClient } from "@prisma/client";
// // const prisma = new PrismaClient({
// //   log: ['query', 'info', 'warn', 'error'],
// // })
// const prisma = new PrismaClient();
// export const lastTrajectoriesDates = async( ) => {
// const lastTrajectoriesDates= await prisma.trajectories.groupBy({
//     by: ["taxi_id"],
//     _max: {
//       date: true,
//     }
//     });
// return await Promise.all(
//     lastTrajectoriesDates.map(async (item) => {
//       const lastTrajectory = await prisma.trajectories.findFirst({
//         where: {
//           taxi_id: item.taxi_id,
//           date: item._max.date,
//         },
//       });
//       // console.log(lastTrajectory);
//       const taxiDetails = await prisma.taxis.findUnique({
//         where: {
//           id: item.taxi_id,
//         },
//       });
//       // console.log(taxiDetails);
//       // Combinar los detalles de la trayectoria y del taxi en un objeto
//       return {
//         taxiId: item.taxi_id,
//         plate: taxiDetails?.plate,
//         date: lastTrajectory?.date,
//         latitude: lastTrajectory?.latitude,
//         longitude: lastTrajectory?.longitude,
//       };
//     })
//   );
// }
