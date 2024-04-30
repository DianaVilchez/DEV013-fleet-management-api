// import express from 'express'
import { Router } from "express";
import { getTrajectories} from "../controllers/trajectories";

// cada router que se exporta es diferente aun asi tenga el mismo nombre
const router = Router()

router.get('/trajectories'/*,middleware*/,getTrajectories)

export default router