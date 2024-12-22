"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const { swaggerDocs } = require('./swagger');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
app.use(routes_1.router);
//iniciar el servidor 
app.listen(PORT, () => {
    console.log(`Servidor conectado en el puerto ${PORT}`);
    swaggerDocs(app, PORT);
});
module.exports = app;
