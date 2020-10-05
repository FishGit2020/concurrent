'use strict';

const Hapi = require('@hapi/hapi');
const fs = require('fs');
const util = require('util');

const init = async () => {

    const server = new Hapi.server({
        port: 8080,
        host: 'localhost',
        load: {concurrent: 1} // hapi ^18.x.x
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response('Hello World');
            // return 'Hello World';
        }
    });

    server.route({
        method: 'GET',
        path: '/google',
        handler: (request, h) => {
            return h.response('Redirect to google.')
                .redirect('http://www.google.com')
        }
    });

    server.route({
        method: 'GET',
        path: '/setTimeoutTest',
        handler: (request, h) => {
            console.log('at setTimeout test');

            let flag = false;
            setTimeout(()=> {
                console.log(`change ${flag} to true`);
                flag = true;
            }, 3000);

            return flag;
        }
    });

    server.route({
        method: 'GET',
        path: '/readFileSyncTest',
        handler: (request, h) => {
            console.log('at readFileSync test');

            let aPieceOfCode = fs.readFileSync('./concurrent.js', 'utf8');

            return aPieceOfCode;
        }
    });

    server.route({
        method: 'GET',
        path: '/readFileTestPromiseV1',
        handler: (request, h) => {
            console.log('at readFile with promise, v1');

            let response = fs.promises.readFile('./concurrent.js', 'utf8')
                .then((aPieceOfCode) => {
                    return h.response(aPieceOfCode);
                })
                .catch((err) => {
                    return h.response(err).code(500);
                    //throw err;
                });
            return response;
        }
    });

    server.route({
        method: 'GET',
        path: '/readFileTestPromiseV2',
        handler: (request, h) => {
            console.log('at readFile with promise, v2');

            let response = new Promise((resolve, reject) => {
                fs.readFile('./concurrent.js', 'utf8', (err, aPieceOfCode)=> {
                    if (err) {
                        reject(h.response(err).code(500));
                    } else {
                        resolve(h.response(aPieceOfCode));
                    }
                });
            });
            return response;
        }
    });

    server.route({
        method: 'GET',
        path: '/readFileTestPromiseV3',
        handler: (request, h) => {
            console.log('at readFile with util.promisify, v3');

            let readFile = util.promisify(fs.readFile);
            let response = readFile('./concurrent.js', 'utf8')
                .then((aPieceOfCode) => {
                    return h.response(aPieceOfCode);
                })
                .catch((err) => {
                    return h.response(err).code(500);
                    //throw err;
                });
            return response;
        }
    });

    await server.start();
    console.log('Server is running on: ' + server.info.uri);
};

init();

