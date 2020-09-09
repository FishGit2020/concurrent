'use strict';

const Hapi = require('@hapi/hapi');
const fs = require('fs');

const init = async() => {
    const server = new Hapi.server({
        host: 'localhost',
        port: 8080
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return h.response('Hi');
        }
    })

    await server.start();
    console.log('Server starts at: ' + server.info.uri);
}

init();
