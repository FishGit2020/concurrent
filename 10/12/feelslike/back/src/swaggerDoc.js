import swaggerJSDoc from 'swagger-jsdoc';

const doc = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'feelslike',
            version: '1.0.0'
        }
    },
    apis: ['./routes/*.js']
}

const swaggerDoc = swaggerJSDoc(doc);

export default swaggerDoc;