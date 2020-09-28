import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
    openapi: '3.0.3',
    info: {
        title: 'feels like API',
        version: '1.0.0'
    }
}

const options = {
    swaggerDefinition,
    apis: ['server.js']
}

const swaggerDoc = swaggerJSDoc(options);

export default swaggerDoc;