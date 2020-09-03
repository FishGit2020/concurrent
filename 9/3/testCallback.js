'use strict'

const fs = require('fs');

const data = fs.readFileSync('./concurrent.js');
console.log(data.toString('utf8'));

const data1 = fs.readFileSync('./concurrent.js', 'utf8');
console.log(data1);

console.log('Done');



