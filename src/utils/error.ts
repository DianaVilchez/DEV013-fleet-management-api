//generalmente se colocan funciones y módulos que ofrecen utilidades o herramientas reutilizables que no están 
//directamente relacionadas con la lógica de negocios principal, pero que son esenciales para el funcionamiento de la aplicación

import {Response} from 'express';

const handleHttp = (res: Response, error:String) =>{
    res.status(500)
    res.send(error)
}
export { handleHttp }