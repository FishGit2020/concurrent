'use strict';

import express from 'express';
import { feelslike, cacheWeather } from './feelslike.js';
import { getInfo, putInfo, deleteInfo, getAll } from './userInfo.js';

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
routes.get('/feelslike/:city?', cacheWeather, feelslike);

/**
 * @swagger
 * /api/v1/info/save:
 *   put:
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
 *               name:
 *                 description: a person
 *                 type: string
 *               city:
 *                 description: city this person lives
 *                 type: string
 *           example:
 *             name: 'Bruce'
 *             city: 'Houston'
 *     responses:
 *       201:
 *         description: save successed
 *         content:
 *           application/json: {}
 */
routes.put('/info/save', putInfo);

/**
 * @swagger
 * /api/v1/info/find/{name}:
 *   get:
 *     tags:
 *     - userInfo
 *     description: get user info
 *     parameters:
 *     - name: name
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: a successful response
 */
routes.get('/info/find/:name?', getInfo);

/**
 * @swagger
 * /api/v1/info/delete/{name}:
 *   delete:
 *     tags:
 *     - userInfo
 *     description: get user info
 *     parameters:
 *     - name: name
 *       in: path
 *       required: true
 *     responses:
 *       200:
 *         description: a successful response
 */
routes.delete('/info/delete/:name?', deleteInfo);

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