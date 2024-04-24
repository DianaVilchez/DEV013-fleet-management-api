//este archivo se suele llamar app o server
//configura la aplicacion express y la exporta
//establecer la rutas y configurar los middleware
import 'dotenv/config'
import express from 'express';
const cors = require('cors');
import  { router }  from './routes';

// se importan las rutas:
import routesTaxis from './routes/taxis';
import routesTrajectories from './routes/trajectories'

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

//añadir rutas 
app.use('/', routesTaxis);
app.use('/',routesTrajectories);

// middlewares

app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`)
});


//iniciar el servidor 
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log('Servidor conectado en el puerto 3000')
// });

