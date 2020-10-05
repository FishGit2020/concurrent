import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'Feels like API',
            description: 'this is api document of feels like app',
            version: '1.0.0'
        }
    },
    apis: ['routers.js']
}

const swaggerDoc = swaggerJsDoc(options);

export default swaggerDoc;