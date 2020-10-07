import express from 'express';

const routes = express.Router();

/**
 * @swagger
 * /home:
 *   get:
 *     tags:
 *     - home
 *     description: home page
 *     responses:
 *       200:
 *         description: successful
 */
routes.get('/home', (req, res) => {
    res.send('<h1>Welcome</h1>');
});

/**
 * @swagger
 * /home/health:
 *   get:
 *     tags:
 *     - home
 *     description: check health
 *     responses:
 *       200:
 *         description: successful
 */
routes.get('/home', (req, res) => {
    res.send('good');
});

export default routes;