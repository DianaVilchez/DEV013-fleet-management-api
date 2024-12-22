"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const trajectories_1 = require("../controllers/trajectories");
const router = (0, express_1.Router)();
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
 *           format: date
 *         required: false
 *         description: The date for which to retrieve trajectories (YYYY-MM-DD).
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
 *         description: The number of data; used for pagination.
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
 *                         type: string
 *                       longitude:
 *                         type: string
 *                       id:
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
/**
 * @swagger
 * /trajectories/latest:
 *   get:
 *     tags:
 *       - Trajectorie/{taxi_id}
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
 *                       plate:
 *                         type: string
 *                       taxi_id:
 *                         type: integer
 *                       date:
 *                         type: string
 *                       latitude:
 *                         type: string
 *                       longitude:
 *                         type: string
 *                       id:
 *                         type: string
 *                 nextCursor:
 *                   type: integer
 *                   description: The ID of the last taxi in the list, to be used as the 'lastId' parameter for fetching the next page.
 */
router.get('/trajectories', trajectories_1.getTrajectoriesByIdAndDate);
router.get('/trajectories/latest', trajectories_1.getLastTrajectories);
router.post('/trajectories/report', trajectories_1.sendTrajectoriesReport);
// //rutas adicionales
router.get('/trajectories/all', trajectories_1.getAllTrajectories);
router.get('/lasttrajectory', trajectories_1.getLastTrajectory);
exports.default = router;
