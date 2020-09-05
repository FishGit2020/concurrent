'use strict'

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
            console.log('At /');
            return h.response('Hi');
        }
    });

    server.route({
        method: 'GET',
        path: '/google',
        handler: (request, h) => {
            console.log('At google')
            return h.response('Redirect to google.com')
                .redirect('http://google.com')
                .code(301);
        }
    });

    // optional parameter path
    server.route({
        method: 'GET',
        path: '/hello/{user?}',
        handler: (request, h) => {
            if (request.params.user) {
                console.log('At hello');
                return 'Hi ' + request.params.user + '!';
            } else {
                return 'Hi';
            }
        }
    });

    server.route({
        method: 'GET',
        path: '/readFile/{fileName}',
        handler: (request, h) => {
            let requestedFile = fs.promises.readFile(request.params.fileName, 'utf8')
                .then((requestedFile) => {
                    console.log('Found file: ' + request.params.fileName)
                    return h.response(requestedFile);
                })
                .catch((error) => {
                    console.log(error.stack);
                    return h.response(error.message);
                });
            return requestedFile;
        }
    });

    await server.start();
    console.log('Server started at: ' + server.info.uri);

};

init();

