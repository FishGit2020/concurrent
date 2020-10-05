import express from 'express';

const routes = express.Router();

/**
 * @swagger
 * /api/home:
 *   get:
 *     description: home page
 *     summary: return home page info
 *     responses:
 *       '200':
 *         description: a successful response
 */
routes.get('/home', (req, res) => {
    res.send("Hi");
});

export default routes;