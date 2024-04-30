// import express from 'express'
import { Router } from "express";
import { getDataTaxis } from "../controllers/taxis";

// cada router que se exporta es diferente aun asi tenga el mismo nombre
const router = Router()

router.get('/taxis',/*middleware*/getDataTaxis)

export default router