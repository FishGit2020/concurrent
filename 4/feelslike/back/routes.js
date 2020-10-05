import express from 'express';

const routes = express.Router();

routes.get('/home', (req, res) => {
    res.send("Hi");
});

export default routes;