import { Request, Response } from "express";
import { PrismaClient} from "@prisma/client";
import { getStartAndEndOfDay } from "../utils/date";
import createExcelData from "../utils/excel";
import { transporter } from "../utils/gmail";
import { pagination } from "../utils/pagination";
import { trajectoriesData } from "../servicies/trajectories";
import { lastTrajectoriesDates } from "../servicies/lastTrajectories";

const prisma = new PrismaClient();

const getTrajectoriesByIdAndDate = async (req: Request, res: Response) => {
  try {
    const { taxi_id, date } = req.query;
    const { page, limit, startIndex } = pagination(
      req.body.page,
      req.body.limit
    );
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date as string);

    if (!taxi_id || !date || date === "" || taxi_id === "") {
      return res.status(400).json({ message: "Dato no insertado" });
    }
    const trajectories = await trajectoriesData(
      Number(taxi_id),
      startOfDay,
      endOfDay,
      startIndex,
      limit
    );

    if (trajectories.length > 0) {
      return res.status(200).json({
        data: trajectories,
        page: page,
        limit: limit,
      });
    } else {
      return res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
const getLastTrajectories = async (req: Request, res: Response) => {
  const { page, limit, startIndex } = pagination(req.body.page, req.body.limit);

  try {
    const lastTrajectories: any = await lastTrajectoriesDates(
      startIndex,
      limit
    );

    return res.status(200).json({
      pageLastTrajectories: lastTrajectories,
      page: page,
      limit: limit,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error interno del servidor", error });
  }
};
// filtra por taxi_id y date
const sendTrajectoriesReport = async (req: Request, res: Response) => {
  try {
    const { taxi_id, date, email } = req.body;
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date as string);
    console.log("Start of Day:", startOfDay);
console.log("End of Day:", endOfDay);

    if (!taxi_id || !date || date === "" || taxi_id === "") {
      return res.status(400).json({ message: "Dato no insertado" });
    }
    const trajectoriesData = await prisma.trajectories.findMany({
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
        return {
          ...trajectory,
          // Convertir la fecha a formato UTC
          date: trajectory.date ? new Date(trajectory.date).toISOString() : null,
        };
      });
      // transforma el res en excel y crea un archivo xlsx
      const fileName = `trajectories_${taxi_id}_${date}.xlsx`;
      console.log("fileName", fileName);
      const filePath = createExcelData(formattedTrajectories, fileName);
      // Establece el tipo de contenido como un archivo Excel
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

      await transporter.sendMail({
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
    } else {
      return res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
//voy a ver si dejarlo en la misma ruta o cambiarlo
// const getAllTrajectories = async (req: Request, res: Response) => {
//   try {
//     const { page, limit, startIndex } = pagination(
//       req.body.page,
//       req.body.limit
//     );

//     let whereOptions = {};

//     const trajectoriesData = await prisma.trajectories.findMany({
//       where: whereOptions,
//       skip: startIndex,
//       take: limit,
//       orderBy: { id: "asc" },
//     });
//     if (trajectoriesData.length > 0) {
//       return res.status(200).json({
//         data: trajectoriesData,
//         page: page,
//         limit: limit,
//       });
//     } else {
//       return res.status(404).json({ message: "No se encontraron datos" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Error en el servidor" });
//     // return handleHttp(res, "Error en el servidor");
//   }
// };

// const getLastTrajectory = async (req: Request, res: Response) => {
//   console.log("hola");
//   const { taxi_id } = req.query;
//   if (!taxi_id) {
//     return res.status(400).json({ message: "Faltan datos" });
//   }
//   const taxi = await prisma.taxis.findUnique({
//     where: {
//       id: parseInt(taxi_id as string),
//     },
//   });

//   const lastTrajectorie = await prisma.trajectories.findFirst({
//     where: {
//       taxi_id: Number(taxi_id),
//     },
//     orderBy: {
//       id: "desc",
//     },
//   });

//   if (!taxi) {
//     return res.status(404).json({ message: "Taxi no encontrado" });
//   }
//   console.log("taxi", taxi.plate);
//   const dataLastTrajectorie = {
//     plate: taxi.plate,
//     ...lastTrajectorie,
//   };
//   return res.status(200).json({ dataLastTrajectorie });
// };

// const getTrajectoriesForItem = async (req: Request, res: Response) => {
//   try {
//     const { taxi_id, date } = req.query;
//     const { page, limit, startIndex } = pagination(
//       req.body.page,
//       req.body.limit
//     );

//     console.log("taxi_id", taxi_id);
//     console.log("date", date);
//     //obtener las 24 horas del dia
//     //getFullYear():obtiene el año,getMonth():el mes,getDate():el dia
//     //endofday tiene que ser un dia mas , ya que marca el limite de la fecha
//     const { startOfDay, endOfDay } = getStartAndEndOfDay(date as string);

//     let whereOptions = {};
//     if (taxi_id && date) {
//       return res
//         .status(400)
//         .json({
//           message: "Solo se permite un parámetro: taxi_id o date, no ambos",
//         });
//     }
//     if (!taxi_id || !date) {
//       return res.status(400).json({ message: "Dato no insertado" });
//     }
//     if (date === "" || taxi_id === "") {
//       return res.status(400).json({ message: "Dato no insertado" });
//     }
//     if (date) {
//       console.log("hola");
//       console.log("startOfDay", startOfDay);
//       whereOptions = {
//         ...whereOptions,
//         date: {
//           gte: startOfDay,
//           lt: endOfDay,
//         }, // Asegurarse de que la fecha sea válida
//       };
//     }
//     if (taxi_id) {
//       whereOptions = { ...whereOptions, taxi_id: Number(taxi_id) };
//     }
//     const trajectoriesData = await prisma.trajectories.findMany({
//       where: whereOptions,
//       skip: startIndex,
//       take: limit,
//       orderBy: { id: "asc" },
//     });
//     if (trajectoriesData.length > 0) {
//       return res.status(200).json({
//         data: trajectoriesData,
//         page: page,
//         limit: limit,
//       });
//     } else {
//       return res.status(404).json({ message: "No se encontraron datos" });
//     }
//   } catch (error) {
//     return res.status(500).json({ message: "Error en el servidor" });
//     // return handleHttp(res, "Error en el servidor");
//   }
// };
export { getTrajectoriesByIdAndDate, getLastTrajectories, sendTrajectoriesReport };
// export { getAllTrajectories, getLastTrajectory, getTrajectoriesForItem };
