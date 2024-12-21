import 'dotenv/config'
import express from 'express';
import  { router }  from './routes';

const { swaggerDocs } = require ('./swagger')
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

//iniciar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
    swaggerDocs(app,PORT)
});

module.exports = app;