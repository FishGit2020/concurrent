const spdy = require('spdy');
const fs = require('fs');

const options = {
    // Private key
    key: fs.readFileSync(__dirname + '/ssl/localhost-privkey.pem'),

    // Fullchain file or cert file (prefer the former)
    cert: fs.readFileSync(__dirname + '/ssl/localhost-cert.pem'),

    // **optional** SPDY-specific options
    spdy: {
        protocols: ['h2', 'spdy/3.1', 'http/1.1'],
        plain: false,

        // **optional**
        // Parse first incoming X_FORWARDED_FOR frame and put it to the
        // headers of every request.
        // NOTE: Use with care! This should not be used without some proxy that
        // will *always* send X_FORWARDED_FOR
        'x-forwarded-for': true,

        connection: {
            windowSize: 1024 * 1024, // Server's window size

            // **optional** if true - server will send 3.1 frames on 3.0 *plain* spdy
            autoSpdy31: false
        }
    }
};

const server = spdy.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end('hello world!');
});

server.listen(3000);
