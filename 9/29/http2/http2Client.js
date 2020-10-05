const http2 = require('http2');
const client = http2.connect('http://localhost:8000');
const req = client.request({
    ':method': 'GET',
    ':path': '/'
});

req.on('response', (responseHeaders) => {
    // do something with the headers
    console.log(responseHeaders);
});

req.on('data', (chunk) => {
    // do something with the data
    console.log("data: " + chunk);
});

req.on('end', () => client.destroy());
