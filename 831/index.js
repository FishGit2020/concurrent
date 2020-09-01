'use strict'

const Hapi = require('@hapi/hapi');

const init = async function(){

    const server = new Hapi.server({
        host: 'localhost',
        port: 8080
    });`ljklkjhj`

    const handlerV1 = function(request, h){
        console.log('v1 called.');
        return 'okay'
    }

    server.route({
        method: 'GET',
        path: '/v1',
        handler: handlerV1
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
}

init()


