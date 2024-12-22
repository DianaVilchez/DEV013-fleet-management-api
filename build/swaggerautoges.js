"use strict";
const swaggerAutogen = require('swagger-autogen')();
const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: 'localhost:3000'
};
const outputFile = './swagger-output.json';
const routes = ['./path/userRoutes.js', './path/bookRoutes.js'];
swaggerAutogen(outputFile, routes, doc);
