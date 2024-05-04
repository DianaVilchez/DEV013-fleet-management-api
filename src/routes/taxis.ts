// import express from 'express'
import { Router } from "express";
import { getDataTaxis } from "../controllers/taxis";

// cada router que se exporta es diferente aun asi tenga el mismo nombre
const router = Router()
/**
 * @openapi
 * /taxis:
 *   get:
 *     tags:
 *       - Taxis
 *     parameters:
 *       - in: query
 *         name: taxi_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the taxi to retrieve trajectories for.
 *       - in: query
 *         name: date
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: The date for which to retrieve trajectories (YYYY-MM-DD).
 *       - in: query
 *         name: lastId
 *         schema:
 *           type: integer
 *         required: false
 *         description: The ID of the last trajectory received; used for pagination.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                 nextCursor:
 *                   type: integer
 *                   description: The ID of the last taxi in the list, to be used as the 'lastId' parameter for fetching the next page.
 *                 limit:
 *                   type: integer
 *                   description: The number of items per page that was requested.
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Error
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */

router.get('/taxis',/*middleware*/getDataTaxis)

export default router