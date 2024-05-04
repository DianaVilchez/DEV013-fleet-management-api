"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import express from 'express'
const express_1 = require("express");
const taxis_1 = require("../controllers/taxis");
// cada router que se exporta es diferente aun asi tenga el mismo nombre
const router = (0, express_1.Router)();
/**
 * @swagger
 * /taxis:
 *   get:
 *     summary: Retrieve a paginated list of taxis.
 *     description: Returns a paginated list of taxis, allowing for browsing through taxis data efficiently.
 *     tags: [Taxis]
 *     parameters:
 *       - in: query
 *         name: lastId
 *         schema:
 *           type: integer
 *         required: false
 *         description: The last taxi ID received. This is used for cursor-based pagination to fetch the next set of taxis.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: The number of taxis to return per page. Defaults to 10 if not specified.
 *     responses:
 *       200:
 *         description: A paginated list of taxis.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The taxi ID.
 *                       name:
 *                         type: string
 *                         description: The name of the taxi.
 *                       // Add other taxi fields as necessary
 *                 nextCursor:
 *                   type: integer
 *                   description: The ID of the last taxi in the list, to be used as the 'lastId' parameter for fetching the next page.
 *                 limit:
 *                   type: integer
 *                   description: The number of items per page that was requested.
 *       500:
 *         description: Internal server error.
 */
router.get('/taxis', /*middleware*/ taxis_1.getDataTaxis);
exports.default = router;
