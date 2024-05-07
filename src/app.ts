//este archivo se suele llamar app o server
//configura la aplicacion express y la exporta
//establecer la rutas y configurar los middleware
// const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerDefinition = require('./swagger');
import 'dotenv/config'
import express from 'express';
import  { router }  from './routes';

// se importan las rutas:
import routesTaxis from './routes/taxis';
import routesTrajectories from './routes/trajectories'
const { swaggerDocs } = require ('./swagger')
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
//server hace referencia a express
// console.log(typeof(swaggerUi.serve))
// /*swagger*/app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

//añadir rutas 
app.use('/', routesTaxis);
app.use('/',routesTrajectories);


// middlewares

//iniciar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
    swaggerDocs(app,PORT)
});

module.exports = app;