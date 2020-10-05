'use strict';

const Hapi = require('@hapi/hapi');
const fs = require('fs');

const init = async () => {
    const server = new Hapi.server({
        host: 'localhost',
        port: '8080'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response('Hi!');
        }
    });

    server.route({
        method: 'GET',
        path: '/readFileV1/{fileName?}',
        handler: (request, h) => {
            let promise = fs.promises.readFile('./'+request.params.fileName, 'utf8')
                .then((fileData) => {
                    console.log('Found file: ' + request.params.fileName);
                    return h.response(fileData);
                })
                .catch((error) => {
                    console.log(error.stack);
                    return h.response(error.message);
                });
            return promise;
        }
    });

    server.route({
        method: 'GET',
        path: '/readFileV2/{fileName?}',
        handler: (request, h) => {
            let promise = new Promise((resolve, reject) => {

                fs.readFile('./'+request.params.fileName, 'utf8', (error, fileData) => {
                    if (error !== null) {
                        console.log(error);
                        reject(h.response(error.message));
                    } else {
                        console.log('Found file: ' + request.params.fileName);
                        resolve(h.response(fileData));
                    }
                });
            });

            return promise;
        }
    });

    server.route({
        method: 'POST',
        path: '/readFileV3',
        handler: (request, h) => {
            let promise = new Promise((resolve, reject) => {
                if (request.payload === null) {
                    let errorJson = errorCreator(500, "Internal Server Error", "Missing Payload");
                    resolve(h.response(errorJson).code(500));
                } else {
                    let payloadJson = JSON.parse(request.payload);
                    if ('fileName' in payloadJson){
                        let fileName = payloadJson.fileName;
                        let filePath = './' + fileName;
                        fs.readFile(filePath, 'utf8', (error, fileData) => {
                            if (error !== null) {
                                let errorJson = errorCreator(500, "read file error", error.message);
                                resolve(h.response(errorJson).code(500));
                            } else {
                                console.log('Found file: '+fileName);
                                resolve(h.response(fileData));
                            }
                        });
                    } else {
                        let errorJson = errorCreator(500, "Internal Server Error", "Missing 'fileName'");
                        resolve(h.response(errorJson).code(500));
                    }
                }
            });

            return promise;
        }
    });

    await server.start();
    console.log('Server runs at: ' + server.info.uri);

};

const errorCreator = (code, error, message) => {
    let errorJson = {
        "statusCode": code,
        "error": error,
        "message": message
    };
    console.log(new Error(message).stack);
    return errorJson;
};

init();

