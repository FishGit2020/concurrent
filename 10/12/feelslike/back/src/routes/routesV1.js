import express from 'express';
import { getInfo, saveInfo } from './handlers/dbQuery.js';

const routes = express.Router();

/**
 * @swagger
 * /api/v1/getInfo:
 *   get:
 *     tags:
 *       [database]
 *     description: get all user info
 *     responses:
 *       200:
 *         description: retreved all user info
 */
routes.get('/getInfo', getInfo);

/**
 * @swagger
 * /api/v1/saveInfo:
 *   put:
 *     tags:
 *       [database]
 *     description: save user info
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *             - name:
 *                 type: string
 *             - city:
 *                 type: string
 *           example:
 *             name: Bruce
 *             city: Houston
 *       required: true
 *     responses:
 *       201:
 *         description: saved user info
 */
routes.put('/saveInfo', saveInfo);

export default routes;