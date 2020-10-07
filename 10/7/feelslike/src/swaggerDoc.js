
import swaggerJSDoc from 'swagger-jsdoc';

const config = {
    swaggerDefinition: {
        info: {
            title: 'feelslike',
            version: '1.0.0'
        },
        openapi: '3.0.3'
    },
    apis: ['./routes/*.js', './routes/v1/*.js']
}

const swaggerDoc = swaggerJSDoc(config);

export default swaggerDoc;