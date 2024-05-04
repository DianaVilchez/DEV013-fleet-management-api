const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
import { Express } from 'express';

const swaggerDefinition = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Fleet managament API REST',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  },
    apis: ['src/routes/taxis*','src/routes/trajectories*'], // los archivos donde tienes tus endpoints

  };
  
const specs = swaggerJSDoc(swaggerDefinition);

const swaggerDocs = (app: Express, port: number) => {
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
  console.log(`Swagger Docs conectado en el puerto ${port}`)
};

// Usando la función en tu archivo principal
module.exports = { swaggerDocs }
 