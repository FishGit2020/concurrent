'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = new Hapi.server({
        host: 'localhost',
        port: '8080'
    });

    server.route({
        method: 'GET',
        path: '/health',
        handler: (request, h) => {
            return h.response('Good');
        }
    });

    await server.start();
    console.log('Server running on: ' + server.info.uri);

};

init();

