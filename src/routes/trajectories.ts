import { Router } from "express";
import { getTrajectoriesByIdAndDate,getLastTrajectories, sendTrajectoriesReport,getLastTrajectory , getAllTrajectories} from "../controllers/trajectories";

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
router.get('/trajectories',getTrajectoriesByIdAndDate)
router.get('/trajectories/latest',getLastTrajectories)
router.post('/trajectories/report',sendTrajectoriesReport)
// //rutas adicionales
router.get('/trajectories/all',getAllTrajectories)
router.get('/lasttrajectory',getLastTrajectory)


export default router
