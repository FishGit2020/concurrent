const http2 = require('http2');
const fs = require('fs');

const server = http2.createSecureServer({
    key: fs.readFileSync('./ssl/localhost-privkey.pem'),
    cert: fs.readFileSync('./ssl/localhost-cert.pem')
}, (request, response) => {
    response.end('hello World!')
}).listen(8080);
