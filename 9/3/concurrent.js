'use restrict'

const concurrent = (callback) => {
//    return Promise((resolve, reject) => {
//        resolve('done');
        // setTimeour(resolve('done'), 5000);
//    })
    console.log('Done')
    return callback
}

async () => {
    console.log('async function');
    return concurrent().then(response => {
        console.log(response);
        return response;
    })
}


() => {
    console.log('sync function');
    return concurrent();
}

concurrent();

