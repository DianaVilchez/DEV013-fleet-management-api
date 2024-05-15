// import express from 'express'
import { Router } from "express";
import { /*getDataTaxis,*/ getAllTaxis } from "../controllers/taxis";

// cada router que se exporta es diferente aun asi tenga el mismo nombre
const router = Router()
/**
 * @swagger
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
 *         description: The ID of the taxi to retrieve information for.
 *       - in: query
 *         name: plate
 *         schema:
 *           type: string
 *           format: string
 *         required: false
 *         description: The plate number of the taxi to retrieve information for.
 *       - in: query
 *         name: lastId
 *         schema:
 *           type: integer
 *         required: false
 *         description: The last ID of the taxi list; used for pagination.
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
 *                       id:
 *                         type: integer
 *                       plate:
 *                         type: string
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
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Unexpected server error
 */

// router.get('/taxis',/*middleware*/getDataTaxis)

router.get('/taxis',/*middleware*/getAllTaxis)

export default router