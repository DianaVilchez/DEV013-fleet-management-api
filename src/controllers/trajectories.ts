import { Request, Response } from "express";
import { PrismaClient, /*trajectories*/} from "@prisma/client";
import { handleHttp } from "../utils/error";

const prisma = new PrismaClient();
// module.exports = {
const getTrajectories = async (req: Request, res: Response) => {
  try {
    const { taxi_id, date } = req.query;

    const lastId = parseInt(req.query.lastId as string, 10) || 0; // Página actual
    const limit = parseInt(req.query.limit as string, 10) || 10; // Tamaño de página

    console.log(taxi_id);
    console.log(date);

    const dateList = new Date(date as string);
    const starOfDay = new Date(
      Date.UTC(
        dateList.getUTCFullYear(),
        dateList.getUTCMonth(),
        dateList.getUTCDate()
      )
    );
    const endOfDay = new Date(
      Date.UTC(
        dateList.getUTCFullYear(),
        dateList.getUTCMonth(),
        dateList.getUTCDate() + 1
      )
    );

    let trajectoriesData;
    if (taxi_id && date) {
      trajectoriesData = await prisma.trajectories.findMany({
        where: {
          taxi_id: Number(taxi_id), // Convertir a número si es necesario
          date: {
            gte: starOfDay,
            lt: endOfDay,
          }, // Asegurarse de que la fecha sea válida
        },
        take: limit,
        cursor: lastId ? { id: Number(lastId) } : undefined,
        skip: lastId ? 1 : 0, // Omitir el registro actual del cursor para empezar después de este
        orderBy: {
          id: "asc",
        },
      });
      console.log(trajectoriesData);
      if (trajectoriesData.length > 0) {
        return res.status(200).json({
          data: trajectoriesData, // los registros solicitados
          nextCursor:
            trajectoriesData.length > 0
              ? trajectoriesData[trajectoriesData.length - 1].id
              : null, // el ID para la próxima solicitud de paginación
          limit: limit,
        });
      }
      return res.status(404).json({ message: "No se encontraron datos" });
    }
    if (date) {
      console.log("hola");
      //obtener las 24 horas del dia
      //getFullYear():obtiene el año,getMonth():el mes,getDate():el dia
      //endofday tiene que ser un dia mas , ya que marca el limite de la fecha
      console.log(starOfDay);
      trajectoriesData = await prisma.trajectories.findMany({
        where: {
          // taxi_id: Number(taxi_id), // Convertir a número si es necesario
          date: {
            gte: starOfDay,
            lt: endOfDay,
          }, // Asegurarse de que la fecha sea válida
        },
        take: limit,
        cursor: lastId ? { id: Number(lastId) } : undefined,
        skip: lastId ? 1 : 0, // Omitir el registro actual del cursor para empezar después de este
        orderBy: {
          id: "asc",
        },
      });
      console.log("hola2");
      console.log(trajectoriesData);
      if (trajectoriesData.length > 0) {
        return res.status(200).json({
          data: trajectoriesData, // los registros solicitados
          nextCursor:
            trajectoriesData.length > 0
              ? trajectoriesData[trajectoriesData.length - 1].id
              : null, // el ID para la próxima solicitud de paginación
          limit: limit,
        });
      }
      return res.status(404).json({ message: "No se encontraron datos" });
    }
    if (taxi_id) {
      trajectoriesData = await prisma.trajectories.findMany({
        where: {
          taxi_id: Number(taxi_id), // Convertir a número si es necesario
        },
        take: limit,
        cursor: lastId ? { id: Number(lastId) } : undefined,
        skip: lastId ? 1 : 0, // Omitir el registro actual del cursor para empezar después de este
        orderBy: {
          id: "asc",
        },
      });
      console.log(trajectoriesData);
      if (trajectoriesData.length > 0) {
        return res.status(200).json({
          data: trajectoriesData, // los registros solicitados
          nextCursor:
            trajectoriesData.length > 0
              ? trajectoriesData[trajectoriesData.length - 1].id
              : null, // el ID para la próxima solicitud de paginación
          limit: limit,
        });
      }
      return res.status(404).json({ message: "No se encontraron datos" });
    }

    if (!taxi_id || !date) {
      return res.status(400).json({ message: "Faltan datos" });
    }
  } catch (error) {
    return handleHttp(res, "Error en el servidor");
  }
};
const getLastTrajectories = async (_: Request, res: Response) => {
      console.log("hola");
      try {
        const lastTrajectoriesDates = await prisma.trajectories.groupBy({
          by: ["taxi_id"],
          _max: {
            date: true,
          },
        });
        console.log(lastTrajectoriesDates);

        const trajectoriesDetails = await Promise.all(
          lastTrajectoriesDates.map(async (item) => {
            const lastTrajectory = await prisma.trajectories.findFirst({
              where: {
                taxi_id: item.taxi_id,
                date: item._max.date,
              },
            });
            console.log(lastTrajectory);
            const taxiDetails = await prisma.taxis.findUnique({
              where: {
                id: item.taxi_id,
              },
            });
            console.log(taxiDetails);
            // Combinar los detalles de la trayectoria y del taxi en un objeto
            return {
              taxiId: item.taxi_id,
              plate: taxiDetails?.plate,
              date: lastTrajectory?.date,
              latitude: lastTrajectory?.latitude,
              longitude: lastTrajectory?.longitude,
            };
          })
        );
        return res.status(200).json(trajectoriesDetails);
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error interno del servidor", error });
      }
    };
const getLastTrajectory = async (req: Request, res: Response) => {
  console.log("hola")
  const {taxi_id} = req.query;
  if (!taxi_id){
    return res.status(400).json({message:"Faltan datos"});
  }
  const taxi = await prisma.taxis.findUnique({
            where: {
                id: parseInt(taxi_id as string) 
            }
        })
  
  
  const lastTrajectorie = await prisma.trajectories.findFirst({
    where: {
      taxi_id : Number(taxi_id),
    },
    orderBy: {
      id: 'desc'
    }
  })
 
  if (!taxi) {
    return res.status(404).json({ message: "Taxi no encontrado" });
  } 
  console.log (taxi.plate)  
  const dataLastTrajectorie = {
    plate: taxi.plate,
    ...lastTrajectorie
    
    
  }
  return res.status(200).json({dataLastTrajectorie})
}

// ---------------------------------------------------------------------    
  // try {
  //   const { taxi_id, date } = req.query;
  //   const lastId = parseInt(req.query.lastId as string, 10) || 0;
  //   const limit = parseInt(req.query.limit as string, 10) || 10;

  //   let trajectoriesData: trajectories[] = [];

  //   if (date) {
  //     const dateList = new Date(date as string);
  //     const startOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate()));
  //     const endOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(), dateList.getUTCDate() + 1));

  //     trajectoriesData = await prisma.trajectories.findMany({
  //       where: {
  //         date: {
  //           gte: startOfDay,
  //           lt: endOfDay,
  //         }
  //       },
  //       take: limit,
  //       cursor: lastId ? { id: Number(lastId) } : undefined,
  //       skip: lastId ? 1 : 0,
  //       orderBy: {
  //         id: 'asc'
  //       }
  //     });
  //   }

  //   if (taxi_id) {
  //     trajectoriesData = await prisma.trajectories.findMany({
  //       where: {
  //         taxi_id: Number(taxi_id),
  //       },
  //       take: limit,
  //       cursor: lastId ? { id: Number(lastId) } : undefined,
  //       skip: lastId ? 1 : 0,
  //       orderBy: {
  //         id: 'asc'
  //       }
  //     });
  //   }

  //   if (trajectoriesData.length > 0) {
  //     return res.status(200).json({
  //       data: trajectoriesData,
  //       nextCursor: trajectoriesData.length > 0 ? trajectoriesData[trajectoriesData.length - 1].id : null,
  //       limit: limit,
  //     });
  //   } else {
  //     return res.status(404).json({ message: "No se encontraron datos" });
  //   }
    
  // } catch (error) {
  //   return handleHttp(res, "Error en el servidor");
  // }


export { getTrajectories, getLastTrajectories,getLastTrajectory};
