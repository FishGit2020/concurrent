'user strict'

const Hapi = require('@hapi/hapi');
const fs = require('fs');

const init = async () => {
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
    });


    server.route({
        method: 'GET',
        path: '/concurrent/{name?}',
        handler: (request, h) => {
            console.log('At concurrent');

            if (request.params.name != undefined) {
                let promise = new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(request.params.name);
                    }, 3000);
                });
                return promise;
            } else {
                return h.response('Need user name');
            }
        }
    });


    server.route({
        method: 'GET',
        path: '/readFile/{fileName?}',
        handler: (request, h) => {
            console.log('at read file');
            if (request.params.fileName !== undefined) {
                let promise = fs.promises.readFile('./' + request.params.fileName, 'utf8')
                    .then((fileData) => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                resolve(fileData);
                            }, 3000);
                        });
                    })
                    .then((fileData) => {
                        console.log('after timeout');
                        return fileData;
                    })
                    .catch((error) => {
                        console.log(error.stack);
                        return error.message;
                    });
                return promise;
            } else {
                console.log('missing file name');
                return 'Need file name';
            };
        }
    });

    await server.start();
    console.log('Server starts at: ' + server.info.uri);
};

init();

