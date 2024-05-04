"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//este archivo se suele llamar app o server
//configura la aplicacion express y la exporta
//establecer la rutas y configurar los middleware
// const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');
// const swaggerDefinition = require('./swagger');
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
// se importan las rutas:
const taxis_1 = __importDefault(require("./routes/taxis"));
const trajectories_1 = __importDefault(require("./routes/trajectories"));
const { swaggerDocs } = require('./swagger');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use(routes_1.router);
//server hace referencia a express
// console.log(typeof(swaggerUi.serve))
// /*swagger*/app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
//añadir rutas 
app.use('/', taxis_1.default);
app.use('/', trajectories_1.default);
// middlewares
//iniciar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
    swaggerDocs(app, PORT);
});
