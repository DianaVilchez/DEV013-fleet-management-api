// import express from 'express'
import { Router } from "express";
import {PrismaClient} from '@prisma/client'
const router = Router()

const prisma = new PrismaClient()

router.get('/',async(_req,res) => {
 const trajectories = await prisma.trajectories.findMany()
 res.json(trajectories)
})

router.post('/',(_req, res) => {
    res.send('guardar taxis rutas')
})

export default router