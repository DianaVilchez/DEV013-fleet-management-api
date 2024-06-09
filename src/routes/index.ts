// import express from 'express'
import { Router } from 'express';
import routesTaxis from '../routes/taxis';
import routesTrajectories from '../routes/trajectories'

// import { readdirSync } from 'fs';
// dirname : devuelve la ruta actual
// const PATH_ROUTER =`${__dirname}`;
const router = Router()
router.use('/', routesTaxis);
router.use('/',routesTrajectories);

// //para obtener el nombre de la carpeta sin el .ts
// const cleanFileName = (fileName: string) => {
//     const file =fileName.split('.').shift(); /*shift es para obtener el primer elementos despues de que se hayan separado por el punto*/
//     return file;
// };
//funcion que se encarga de leer cuantos archivos y cuales son los archivo sque existen en x directorios
//pero como no queremos la ruta index, ponemos una condicion y exportamos el resto
// readdirSync(PATH_ROUTER).filter((fileName) => {
//     const cleanName = cleanFileName(fileName);
//     if (cleanName !== 'index') {
//         import(`./${cleanName}`).then((moduleRouter) => {
//             console.log(moduleRouter)
//             console.log(`Se esta cargando la ruta /${cleanName}`);
//             router.use(`/${cleanName}`,moduleRouter.default);
//         }) ;
//     }
// });

export { router };

