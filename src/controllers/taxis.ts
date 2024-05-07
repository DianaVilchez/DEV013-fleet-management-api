// import express from 'express'
import { Request, Response } from 'express';
import {PrismaClient} from '@prisma/client'
import { handleHttp } from '../utils/error';

const prisma = new PrismaClient()
// module.exports = {
    
const getDataTaxis = async(req:Request,res:Response) => {
    try{
        const {plate,taxi_id} =req.query;
        if(plate === "" || taxi_id===""){
                return res.status(400).json({message:"Dato no insertado"})
            }

        if(plate || taxi_id){
        if(plate){
            const taxiPlate = await prisma.taxis.findFirst(
                {
                    where: {
                        plate: plate as string 
                    }
                }
            )
            if(!taxiPlate){
                return res.status(404).json({message:"Taxi no encontrado"})
            }
            return res.status(200).json(taxiPlate);
         }
         if(taxi_id){
            const taxiId = await prisma.taxis.findUnique(
                {
                    where: {
                        id: parseInt(taxi_id as string) 
                    }
                }
            )
            if(!taxiId){
                return res.status(404).json({message:"Taxi no encontrado"})
            }
            return res.status(200).json(taxiId)
         }

        }
        
        //implementacion de paginacion 
        // se tiene que especificar el tipo en req.query.page y req.query.limit
        const lastId = parseInt(req.query.lastId as string, 10) || 0; // Página actual
        const limit = parseInt(req.query.limit as string, 10) || 10; // Tamaño de página
        // Recuperar los usuarios de la página actual
        //findMany: obtener todos los datos
        const taxisData = await prisma.taxis.findMany(
            {
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
            }
        )
            return res.status(200).json(
                {
                    data: taxisData, // los registros solicitados
                    nextCursor: taxisData.length > 0 ? taxisData[taxisData.length - 1].id : null, // el ID para la próxima solicitud de paginación
                    limit: limit,
                  }
            );
        
             } catch (e){
            //   return res.status(500).json(e) ;
             return handleHttp(res,'Error en el servidor')
             }
}
// }
export { getDataTaxis}
