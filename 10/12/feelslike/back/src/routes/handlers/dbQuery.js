import { dbModel, joiSchema } from './schema.js';

export const getInfo = (req, res) => {
    console.log("At getInfo.");

    dbModel.find({}, { _id: 0, __v : 0, timestamp: 0}).then((data) => {
        res.send(data);
    });
};

export const saveInfo = (req, res) => {
    console.log("At saveInfo");

    joiSchema.validateAsync(req.body).then((validBody) => {
        validBody.timestamp = new Date();

        const userInfo = new dbModel(validBody);
        userInfo.save().then((info) => {
            console.log("Data saved.");

            res.status(201).send(info);
        }).catch((err) => {
            console.log(err.stack);
            res.status(500).send(err.message);
        });

    }).catch((err) => {
        console.log(err.stack);
        res.status(500).send(err.message);
    })
}
