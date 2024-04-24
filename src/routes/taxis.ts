// import express from 'express'
import { Router } from "express";
import {PrismaClient} from '@prisma/client'
const router = Router()

const prisma = new PrismaClient()

router.get('/taxis',async(req,res) => {
 
 const page = parseInt(req.query._page as string, 10) || 1; // Página actual
 const limit = parseInt(req.query._limit as string, 10) || 10; // Tamaño de página
 const startIndex = (page - 1) * limit; // Índice de inicio
 
 // Recuperar los usuarios de la página actual
 const taxis = await prisma.taxis.findMany()

 const currentPageUsers = taxis.slice(startIndex, startIndex + limit);
      // Enviar resultados al cliente
      res.status(200).json(currentPageUsers);

})

// router.post('/',(_req, res) => {
//     res.send('guardar taxis rutas')
// })

export default router