'use strict';

import express from 'express';
import { feelslike } from './feelslike.js';
import { getInfo, saveInfo, getAll, cacheUser } from './userInfo.js';

const routes = express.Router();

/**
 * @swagger
 * /api/v1/feelslike/{city}:
 *   get:
 *     tags:
 *     - weather
 *     description: get feelslike temperature
 *     parameters:
 *     - name: city
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: successful response
 */
routes.get('/feelslike/:city?', feelslike);

/**
 * @swagger
 * /api/v1/info/save:
 *   post:
 *     tags:
 *     - userInfo
 *     description: save user information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 description: user
 *                 type: string
 *               city:
 *                 description: city
 *                 type: string
 *           example:
 *             user: 'Bruce'
 *             city: 'Houston'
 *     responses:
 *       201:
 *         description: save successed
 *         content:
 *           application/json: {}
 */
routes.post('/info/save', saveInfo);


/**
 * @swagger
 * /api/v1/info/get/{name}:
 *   get:
 *     tags:
 *     - userInfo
 *     description: get user info
 *     paramenters:
 *     - name: name
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: successful
 */
routes.get('/info/get/:name?', cacheUser, getInfo);

/**
 * @swagger
 * /api/v1/info/all:
 *   get:
 *     tags:
 *     - userInfo
 *     description: get all user info
 *     responses:
 *       200:
 *         description: successful
 */
routes.get('/info/all/', getAll);

export default routes;