'use strict';

import swaggerJSDoc from 'swagger-jsdoc';

let swaggerInfo = {
    swaggerDefinition: {
        openapi: '3.0.3',
        info: {
            title: 'feelslike',
            version: '1.0.0'
        }
    },
    apis: ['routes.js']
}

export const swaggerDoc = swaggerJSDoc(swaggerInfo);