import express from 'express';
import { userInfoModel, userInfoSchema } from './userInfoSchema.js';

const routes = express.Router();

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
routes.get('/', (req, res) => {
    res.send("Hello");
});

/**
 * @swagger
 * /api/saveUser:
 *   post:
 *     summary: get all user info
 *     description: get all information from database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 descirption: user
 *                 type: string
 *               city:
 *                 descirption: city the user stays at
 *                 type: string
 *     responses:
 *       '201':
 *         description: user saved
 */
routes.post('/saveUser', (req, res) => {
    console.log("at save user: " + req.body);

    if (req.body === undefined || req.body === '') {
        console.error("missing data");
        res.status(500).send("missing data");
        return;
    }

    userInfoSchema.validateAsync(req.body).then((validBody) => {
        console.log(validBody);
        validBody.timestamp = new Date();

        const newUser = new userInfoModel(validBody);
        newUser.save().then((data) => {
            console.log("saved data: " + data);
            res.status(201).send(data);
        }).catch((error) => {
            console.error("save data error: " + error.stack);
            res.status(500).send("save data error: " + error.message);
        })
    }).catch((error) => {
        console.error("invalide data: " + error.stack);
        res.status(500).send("invalide data: " + error.message);
    });
});

export default routes;