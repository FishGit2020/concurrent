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
            return 'Hi';
        }
    });

    server.route({
        method: 'GET',
        path: '/readFile/{fileName?}',
        handler: (request, h) => {
            if (request.params.fileName !== undefined) {
                let fileName = request.params.fileName;
                let promise = fs.promises.readFile('./'+fileName, 'utf8')
                    .then((data) => {
                        console.log('Found file: ' + fileName);
                        return h.response(data);
                    })
                    .catch((error) => {
                        console.log(error.stack);
                        return h.response(error.message);
                    });
                return promise;
            } else {
                return h.response('file name is not provided').code(500);
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/concurrent',
        handler: (request, h) => {
            console.log('At concurrent');
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('concurrent call done');
                    resolve('Concurrent!');
                }, 10000);
            });
            return promise;
        }
    });

    server.route({
        method: 'POST',
        path: '/concurrent',
        handler: (request, h) => {
            console.log('At concurrent');
            let promise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('concurrent call done');
                    resolve('Concurrent payload is: ' + request.payload);
                }, 10000);
            });
            return promise;
        }
    });

    await server.start();
    console.log('Server runs at: ' + server.info.uri);

};

init();

