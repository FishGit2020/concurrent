import express from 'express';

const routers = express.Router();

/**
 * @swagger
 * /api:
 *   get:
 *     summary: get hello
 *     description: get hello
 *     responses:
 *       '200':
 *         description: a successful response
 */
routers.get('/', (req, res) => {
    res.send("Hello");
});

export default routers;