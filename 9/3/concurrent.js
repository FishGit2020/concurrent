'use restrict';

setTimeout(() => {
    console.log('Done one');
}, 3000);


setTimeout(() => {
    console.log('Done two');
}, 3000);

const concurrent = () => {
    let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Done too!');
        }, 4000);
    });

    return promise;
};

//wrong way to use promise
console.log(concurrent()); // pending promise

// #1 way to use promise
const getConcurrentResult = async () => {
    console.log('At Test!');
    let concurrentResult = await concurrent();
    console.log(concurrentResult);
};
getConcurrentResult();

// #2 way to use promise
concurrent().then((concurrentResult) => {
    console.log(concurrentResult + ' And again!');
});

const callbackFunction = (err, data) => {
    if (err) {
        console.log('Got error: ' + err);
    } else {
        console.log('This is a callback function. I got msg: ' + data);
    }
};

const test = (err, testData, callback) => {
    if (err) {
        console.log('Got err: ' + err);
        callback(err, null);
    } else {
        console.log('Got testData: ' + testData);
        setTimeout(() => {
            callback(null, testData);
        }, 5000);
    }
};

test(null, 'Hi', callbackFunction);
test(null, 'Hi 2!', callbackFunction);
test('Nope', null, callbackFunction);

