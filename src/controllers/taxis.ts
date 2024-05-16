// import express from 'express'
import { Request, Response } from 'express';
import {PrismaClient} from '@prisma/client'
// import { handleHttp } from '../utils/error';

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
        //implementacion de paginacion offset
        const page = parseInt(req.query.page as string) || 0 ;
        const limit = parseInt(req.query.limit as string) || 10 ;
        const offset = (page - 1) * limit;
        if (!page && !limit) {
            const allTaxis = await prisma.taxis.findMany();
            return res.status(200).json(allTaxis);
        }
        const taxisData = await prisma.taxis.findMany(
            {
                skip: offset,
                take:limit,
                orderBy: {
                    id: 'asc' // Asegúrate de que los resultados estén ordenados
                },
            }
        )
            return res.status(200).json(
                {
                    data: taxisData, // los registros solicitados
                    page: page,
                    limit:limit
                }
            );
    } catch (e){
        return res.status(500).json({message:"Error en el servidor"}) ;
            //  return handleHttp(res,'Error en el servidor')
    }
}
// }
export {getDataTaxis}

