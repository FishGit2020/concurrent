import * as fs from 'fs';

async function logChunks(readable) {
    for await (const chunk of readable) {
        console.log(chunk);
    }
}

const readable = fs.createReadStream(
    'tmp/test.txt', {encoding: 'utf8'});

function readableToString(readable) {
    return new Promise((resolve, reject) => {
        let data = '';
        readable.on('data', function (chunk) {
            data += chunk;
        });
        readable.on('end', function () {
            resolve(data);
        });
        readable.on('error', function (err) {
            reject(err);
        });
    });
}

async function readableToString2(readable) {
    let result = '';
    for await (const chunk of readable) {
        result += chunk;
    }
    return result;
}

// readableToString(readable).then(text => {
//     console.log(text);
// })

readableToString2(readable).then(text => {
    console.log(text);
})

// logChunks(readable);
