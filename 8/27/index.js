'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = new Hapi.server({
        host: 'localhost',
        load: { concurrent: 1 },
        port: 8080
    });

    server.route({
        method: 'POST',
        path: '/',
        handler: async (request, h) => {

            // Sleep in loop
            for (let i = 0; i < 5; i++) {
                await sleep(2000);
                console.log(request.payload);
                console.log(i);
            }
            console.log('done');
            return 'Hello World!';
        }
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});


function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

  async function demo() {
    console.log('Taking a break...');
    await sleep(2000);
    console.log('Two seconds later, showing sleep in a loop...');

    // Sleep in loop
    for (let i = 0; i < 5; i++) {
      if (i === 3)
        await sleep(2000);
      console.log(i);
    }
  }

init();
