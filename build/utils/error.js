"use strict";
//generalmente se colocan funciones y módulos que ofrecen utilidades o herramientas reutilizables que no están 
//directamente relacionadas con la lógica de negocios principal, pero que son esenciales para el funcionamiento de la aplicación
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleHttp = void 0;
const handleHttp = (res, error) => {
    res.status(500);
    res.send(error);
};
exports.handleHttp = handleHttp;
