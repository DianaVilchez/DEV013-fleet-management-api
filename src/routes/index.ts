// import express from 'express'
import { Router } from 'express';
// import { readdirSync } from 'fs';
//dirname : devuelve la ruta actual
// const PATH_ROUTER =`${__dirname}`;
const router = Router()


// //para obtener el nombre de la carpeta sin el .ts
// const cleanFileName = (fileName: string) => {
//     const file =fileName.split('.').shift(); /*shift es para obtener el primer elementos despues de que se hayan separado por el punto*/
//     return file;
// };
// //funcion que se encarga de leer cuantos archivos y cuales son los archivo sque existen en x directorios
// //pero como no queremos la ruta index, ponemos una condicion y exportamos el resto
// readdirSync(PATH_ROUTER).filter((fileName) => {
//     const cleanName = cleanFileName(fileName);
//     if (cleanName !== 'index') {
//         import(`./${cleanName}`).then((moduleRouter) => {
//             console.log(`Se esta cargando la ruta /${cleanName}`);
//             router.use(`/${cleanName}`,moduleRouter.router);
//         }) ;
//     }
// });

export { router };

