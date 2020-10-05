const http2 = require('http2');
const fs = require('fs');

const options = {
    key: fs.readFileSync('./ssl/localhost-privkey.pem'),
    cert: fs.readFileSync('./ssl/localhost-cert.pem')
};

const server = http2.createSecureServer(options);

server.on('stream', (stream, requestHeaders) => {
    stream.respond();
    stream.end('secured hello world!');
});

server.listen(8000);
