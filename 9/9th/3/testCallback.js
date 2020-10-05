'use strict'

const fs = require('fs');

const data = fs.readFileSync('./concurrent.js');
console.log(data.toString('utf8'));

const data1 = fs.readFileSync('./concurrent.js', 'utf8');
console.log(data1);

fs.readFile('./concurrent.js', 'utf8', (err, dataFromCallback) => {
    if (err) throw err;
    console.log(dataFromCallback);
});

fs.promises.readFile('./concurrent.js', 'utf8')
    .then((dataFromPromise) => {
        console.log(dataFromPromise);
    })
    .catch((err) => {
        throw err;
    });

console.log('Done');

