const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API de ejemplo',
      version: '1.0.0',
      description: 'Documentación de la API de ejemplo',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
  };
  
  module.exports = {
    swaggerDefinition,
    apis: ['./routes/*.js'], // los archivos donde tienes tus endpoints
  };