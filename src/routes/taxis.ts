// import express from 'express'
import { Router } from "express";
import { getDataTaxis,getAllTaxis} from "../controllers/taxis";

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
 *         name: page
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of page; used for pagination.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description:  The number of data; used for pagination.
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

/**
 * @swagger
 * /taxi:
 *   get:
 *     tags:
 *       - Taxi
 *     parameters:
 *       - in: query
 *         name: taxi_id
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of page; used for pagination.
 *       - in: query
 *         name: plate
 *         schema:
 *           type: varcher
 *         required: false
 *         description:  The number of data; used for pagination.
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
router.get('/taxis',/*middleware*/getAllTaxis)
router.get('/taxi',/*middleware*/getDataTaxis)

export default router