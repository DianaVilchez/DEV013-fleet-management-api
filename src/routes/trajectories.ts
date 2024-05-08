// import express from 'express'
import { Router } from "express";
import { getTrajectories} from "../controllers/trajectories";

// cada router que se exporta es diferente aun asi tenga el mismo nombre
const router = Router()
/**
 * @swagger
 * /trajectories:
 *   get:
 *     tags:
 *       - Trajectories
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
 *           format: string
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
 *                     properties:
 *                       taxi_id:
 *                         type: integer
 *                       date:
 *                         type: string
 *                       latitude:
 *                        type: string
 *                       longitude:
 *                        type: string
 *                       id :
 *                        type: string
 *                 nextCursor:
 *                   type: integer
 *                   description: The ID of the last taxi in the list, to be used as the 'lastId' parameter for fetching the next page.
 *                 limit:
 *                   type: integer
 *                   description: The number of items per page that was requested.
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid input data
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Resource not found
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unexpected server error
 */
router.get('/trajectories'/*,middleware*/,getTrajectories)

export default router
