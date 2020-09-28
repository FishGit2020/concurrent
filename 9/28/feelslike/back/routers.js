import express from 'express';

const routes = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     description: home page
 *     responses:
 *       '200':
 *         description: a successful response
 */
routes.get('/', (req, res) => {
    res.send("Hi");
});

export default routes;