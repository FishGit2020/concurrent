'use strict';

const Hapi = require('@hapi/hapi');
const fs = require('fs');
const got = require('got');
const util = require('util');

const init = async () => {

    const server = new Hapi.server({
        host: 'localhost',
        port: '8080'
    });

    server.route({
        method: 'GET',
        path: '/health',
        handler: (request, h) => {
            console.log('At health check')
            return h.response('Good');
        }
    });

    server.route({
        method: 'GET',
        path: '/hello/{user}',
        handler: (request, h) => {
            console.log('At hello user: ' + request.params.user);
            return h.response('Hello ' + request.params.user);
        }
    });

    server.route({
        method: 'GET',
        path: '/google',
        handler: (request, h) => {
            console.log('At google');
            return h.redirect('http://www.google.com').code(301);
        }
    });

    server.route({
        method: 'GET',
        path: '/ghibli',
        handler: (request, h) => {
            //return h.redirect('https://ghibliapi.herokuapp.com/films');
            console.log('At ghibli');
            let ghibliFilms = got('https://ghibliapi.herokuapp.com/films')
                .then((ghibliApiResponse) => {
                    let filmTitleList = [];
                    let filmList = JSON.parse(ghibliApiResponse.body);
                    filmList.map((jsonItemFromList) => {
                        filmTitleList.push(jsonItemFromList['title']);
                    });
                    return filmTitleList; // no need for promise bc all are javascript code.
                })
                .then((ghibliFilms) => {
                    return h.response(ghibliFilms);
                })
                .catch((error) => {
                    console.error(error.stack);
                    return h.response(error.message);
                });
            return ghibliFilms;
        }
    });

    server.route({
        method: 'GET',
        path: '/concurrent',
        handler: (request, h) => {

            console.log('At concurrent');
            let localfile = fs.promises.readFile('./package-lock.json', 'utf8')
                .then((localfile) => {
                    console.log('Return result after 3 seconds');
                    let promise = new Promise((resolve, reject) => {
                        setTimeout(() => {
                            resolve(localfile);
                        }, 3000);
                    });
                    return promise;
                })
                .then((localfile) => {
                    console.log('Sending localfile');
                    return h.response(localfile);
                })
                .catch((error) => {
                    console.log('Localfile read error: ' + error);
                    return h.response(error).code(500);
                });

            return localfile;
        }
    });

    await server.start();
    console.log('Server running on: ' + server.info.uri);

};

init();

