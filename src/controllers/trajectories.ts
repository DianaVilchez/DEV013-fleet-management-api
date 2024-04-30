import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
// import { handleHttp } from "../utils/error";

const prisma = new PrismaClient();
// module.exports = {
const getTrajectories = async (req: Request, res: Response) => {
  try {
    const { taxi_id, date } = req.query;
    console.log(taxi_id);
    console.log(date);
    if (!taxi_id || !date) {
        
      return res.status(400).json({message:"Faltan datos"});
    }

const dateList = new Date(date as string)

//obtener las 12 horas del dia 
//getFullYear():obtiene el año,getMonth():el mes,getDate():el dia
//endofday tiene que ser un dia mas , ya que marca el limite de la fecha
const starOfDay= new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(),dateList.getUTCDate()))
const endOfDay = new Date(Date.UTC(dateList.getUTCFullYear(), dateList.getUTCMonth(),dateList.getUTCDate() + 1))

const trajectoriesData = await prisma.trajectories.findMany({
      where: {
        taxi_id: Number(taxi_id), // Convertir a número si es necesario
        date: {
            gte: starOfDay,
            lt :endOfDay,
        } // Asegurarse de que la fecha sea válida
      },
      
    });
    
    console.log(trajectoriesData)
    if(trajectoriesData.length>0){
        return res.status(200).json(trajectoriesData)
    }
    return res.status(400).json({message:"Datos no existen"})
    
  } catch (error) {
      return res.status(500).json(error) ;
    // handleHttp(res, "Error en el servidor");
  }
};
export { getTrajectories };
