const Fs = require('fs');
const Hapi = require('hapi');
const Http2 = require('http2');

const init = async () => {
      const options = {
            key: Fs.readFileSync('./ssl/site.key'),
            cert: Fs.readFileSync('./ssl/site.crt')
      };

      const server = Hapi.Server({
            listener: Http2.createServer(options),
            host: 'localhost',
            port: 8080,
            tls: false
      });

      server.route({
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                  return "Hi";
            }
      })

      await server.start();
      console.log("Server starts at: " + server.info.uri);
};

init();
