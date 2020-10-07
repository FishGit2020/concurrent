'use strict';

import { userSchema, userModel } from './schema.js';

export const putInfo = (req, res) => {
    console.log("This is putInfo.");

    if (req.body === undefined || req.body === null) {
        console.error("Missing request body");
        return res.status(500).send("Please provide user info");
    }

    userSchema.validateAsync(req.body).then((validBody) => {
        validBody.timestamp = new Date();
        const userInfo = new userModel(validBody);

        userInfo.save().then((info) => {
            console.log("Saved user info: " + info);
            res.send(info);
        }).catch((err) => {
            console.error(errro.stack);
            res.status(500).send(err.message);
        });

    }).catch((err) => {
        console.error(err.stack);
        res.status(500).send(err.message);
    })
};

export const getInfo = (req, res) => {
    console.log("This is getInfo.");
    const { name } = req.params;

    if (name === undefined) {
        console.error("Missing user name");
        return res.status(500).send("Please provide a name");
    }

    userModel.find({name: name}, { _id: 0, __v : 0, timestamp: 0 })
    .then((userInfo) => {
        if (userInfo.length == 0) {
            return res.send("User not found: " + name);
        }

        console.log("Find user info: " + userInfo);
        res.send(userInfo);
    }).catch((err) => {
        console.error(err.stack);
        res.status(500).send(err.message);
    });
};

export const deleteInfo = (req, res) => {
    console.log("This is deleteInfo.");
    const { name } = req.params;

    if (name === undefined) {
        console.error("Missing user name");
        return res.status(500).send("Please provide a name");
    }

    userModel.deleteMany({name: name})
    .then(() => {
        console.log("Deteled user: " + name);
        res.send("Deteled user: " + name);
    }).catch((err) => {
        console.error(err.stack);
        res.status(500).send(err.message);
    });
};

export const getAll = (req, res) => {
    console.log("This is getAll.");

    userModel.find({}, { _id: 0, __v : 0, timestamp: 0 }).then((allData) => {
        console.log("Got all data: " + allData);
        res.send(allData);
    }).catch((err) => {
        console.error(err.stack);
        res.status(500).send(err.message);
    })
};
