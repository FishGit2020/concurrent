import swaggerJsDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'Feels like API',
            version: '1.0.0'
        }
    },
    apis: ['routers.js']
}

const swaggerDoc = swaggerJsDoc(options);

export default swaggerDoc;