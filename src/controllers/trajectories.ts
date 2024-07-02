import { Request, Response } from "express";
import { PrismaClient, /*trajectories*/} from "@prisma/client";
import { getStartAndEndOfDay } from '../utils/date';
import  createExcelData  from '../utils/excel';
// const nodemailer = require('nodemailer');
// const path = require('path');
import { transporter } from "../utils/gmail";
import { pagination } from "../utils/pagination";
import { trajectoriesData } from "../servicies/trajectories";
import { lastTrajectoriesDates } from "../servicies/lastTrajectories";
// import fs from 'fs'
// import { handleHttp } from "../utils/error";

const prisma = new PrismaClient();
// module.exports = {

const getTrajectories = async (req: Request, res: Response) => {
  try {
    const { taxi_id, date } = req.query;
    const {page, limit, startIndex} = pagination(req.body.page,req.body.limit)
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date as string);

    if (!taxi_id || !date || date === "" || taxi_id==="") {
      return res.status(400).json({ message: "Dato no insertado" });
    }
    const trajectories =await trajectoriesData(Number(taxi_id) , startOfDay, endOfDay, startIndex, limit)

    if (trajectories.length > 0) {
      return res.status(200).json({
        data:trajectories,
        page: page,
        limit: limit,
      });
    } else {
      return res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    return res.status(500).json({message:"Error en el servidor"}) ;
    // return handleHttp(res, "Error en el servidor");
  }
};
const getLastTrajectories = async (req: Request, res: Response) => {

  const {page, limit, startIndex} = pagination(req.body.page,req.body.limit)

      try {
        // any:tipo de dato (se tiene que definir)
        // otra posiblidad es crear un interfaz
        const lastTrajectories: any = await lastTrajectoriesDates(startIndex, limit)

        // const pageLastTrajectories = lastTrajectories.slice(startIndex, startIndex + limit);
       

        return res.status(200).json({
          // pageLastTrajectories,
          pageLastTrajectories:lastTrajectories,
          page:page,
          limit:limit});
      } catch (error) {
        return res.status(500).json({ message: "Error interno del servidor", error });
      }
    };
// filtra por taxi_id y date
const getFiltersTrajectories = async (req: Request, res: Response) => {
      try {
        const { taxi_id, date, email} = req.body;
        const { startOfDay, endOfDay } = getStartAndEndOfDay(date as string);
        
        if (!taxi_id || !date || date === "" || taxi_id==="") {
          return res.status(400).json({ message: "Dato no insertado" });
        }
        const trajectoriesData = await prisma.trajectories.findMany({
          where:{
            date:{
              gte: startOfDay,
              lt: endOfDay,
            },
            taxi_id:Number(taxi_id),
          },
          orderBy: { id: "asc" },
        });
        if (trajectoriesData.length > 0) {
          console.log("1")
          
          // transforma el res en excel y crea un archivo xlsx
          const fileName = `trajectories_${taxi_id}_${date}.xlsx`;
          console.log(fileName)
          const filePath = createExcelData(trajectoriesData, fileName);
          console.log("2")
          // return filePath
        // Establece el tipo de contenido como un archivo Excel
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
      console.log("3")

      // // Envía el archivo Excel al cliente
      // res.sendFile(filePath, async (err) => {
      // if (err) {
      //     console.error(err);
      //     res.status(500).json({ message: "Error al enviar el archivo" });
      //   } 
      //     // Elimina el archivo temporal después de enviarlo
      //     fs.unlink(filePath, (unlinkErr) => {
      //       if (unlinkErr) {
      //         console.error('Error al eliminar el archivo temporal:', unlinkErr);
      //     res.status(400).json({ message: "Error al enviar el archivo" });
          
      //       }
      //     });

      //     // Envía un mensaje indicando que el archivo se ha enviado correctamente
      //     console.log('Archivo enviado correctamente');
        
      // });

    await transporter.sendMail ({
        from: 'educ.dana@gmail.com',        // correo desde el cual se enviará
      to: email,    // destinatario
      subject: 'Trajectorias',      // asunto del correo
      text: `Lista de trajectorias del taxi ${taxi_id}`, // cuerpo del correo en texto
      attachments: [
        {
          filename: fileName , // nombre del archivo que se enviará
          path: filePath // ruta del archivo
        }
      ]
    });
    
  //   const mailOptions = {
  //       from: process.env.SMTP_USER,
  //       to: `${req.body.email}`,
  //       subject: "Thanks for contacting me",
  //       text: "Hi! Thank you for contact me. I'll write you an email as soon as possible!"
  //   }

  //   transporter.sendMail(mailOptions, (error:any, info:any) => {
  //     if (error) {
  //       return console.log(error);
  //     }
  //     console.log('Correo enviado: ' + info.res);
  //   });

  //   transporter.sendMail(mailToMe, (err:any, info:any) => {

  //     console.log('message: ', mailToMe)
  //     if (err) {
  //         console.error(err)
  //     } else {
  //         console.log(info)
  //         res.status(200).json(req.body)
  //     }
  // })

      // Envía una respuesta 200 adicional indicando que el archivo ha sido enviado
       res.status(200).json({ message: "Archivo enviado correctamente" });
       return filePath
     
        } else {
          return res.status(404).json({ message: "No se encontraron datos" });
        }
      } catch (error) {
        return res.status(500).json({message:"Error en el servidor"}) ;
        // return handleHttp(res, "Error en el servidor");
      }
    };
//voy a ver si dejarlo en la misma ruta o cambiarlo
const getAllTrajectories = async (req: Request, res: Response) => {
  try {
    const {page, limit, startIndex} = pagination(req.body.page,req.body.limit)

    
    let whereOptions ={};
   
    const trajectoriesData = await prisma.trajectories.findMany({
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
    } else {
      return res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    return res.status(500).json({message:"Error en el servidor"}) ;
    // return handleHttp(res, "Error en el servidor");
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



const getTrajectoriesForItem = async (req: Request, res: Response) => {
  try {
    const { taxi_id, date } = req.query;
    const {page, limit, startIndex} = pagination(req.body.page,req.body.limit)

    console.log(taxi_id);
    console.log(date);
    //obtener las 24 horas del dia
    //getFullYear():obtiene el año,getMonth():el mes,getDate():el dia
    //endofday tiene que ser un dia mas , ya que marca el limite de la fecha
    const { startOfDay, endOfDay } = getStartAndEndOfDay(date as string);

    let whereOptions ={};
    if (taxi_id && date) {
      return res.status(400).json({ message: "Solo se permite un parámetro: taxi_id o date, no ambos" });
    }
    if (!taxi_id || !date) {
      return res.status(400).json({ message: "Dato no insertado" });
    }
    if(date === "" || taxi_id===""){
      return res.status(400).json({message:"Dato no insertado"})
  }
    if (date) {
      console.log("hola");
      console.log(startOfDay);
      whereOptions= {...whereOptions,
        date: {
          gte: startOfDay,
          lt: endOfDay,
        }, // Asegurarse de que la fecha sea válida
      }
    }
    if (taxi_id) { 
      whereOptions= { ...whereOptions, taxi_id: Number(taxi_id) }  
    }
    const trajectoriesData = await prisma.trajectories.findMany({
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
    } else {
      return res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    return res.status(500).json({message:"Error en el servidor"}) ;
    // return handleHttp(res, "Error en el servidor");
  }
};
export { getTrajectories, getLastTrajectories,getFiltersTrajectories};
export {getAllTrajectories,getLastTrajectory,getTrajectoriesForItem}
