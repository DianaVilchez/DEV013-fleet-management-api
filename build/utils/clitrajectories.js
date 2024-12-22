"use strict";
// import fs from "fs";
// import path from "path";
// import { PrismaClient } from "@prisma/client";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readDirectoryTrajectories = void 0;
// export const readDirectoryTrajectories = async (files: string[], fileDir: string, prisma: PrismaClient): Promise<void> => {
//   //filtrar los archivos (solo los txt)
//     const txtFiles = files.filter((file) => path.extname(file) === ".txt");
//   console.log(txtFiles);
//   for (const fileData of files) {
//   // filePath: la ruta de cada archivo .txt: C:\Users\Diana\Desktop\data\trajectoriesw\1.txt
//   // filedata : es cada una de los archivos txt 1.txt,2.txt
//   const filePath = path.join(fileDir, fileData);
//     console.log('filePath',filePath);
//     console.log('fileData',fileData);
//     const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
//     // console.log('readStream',readStream); 
//         let bufferData = "";
//         // console.log('buffer',bufferData);
//         await new Promise((resolve, reject) => {
//             readStream.on('data', async (chunk) => {
//                 bufferData += chunk;
//                 let lineData = bufferData.split("\n");
//                 bufferData = lineData.pop()!;
//                 const insertData = 
//                 lineData.map(async (line) => {
//                 const [taxi_id, date, latitude, longitude] = line.split(',');
//                     if (taxi_id && date && latitude && longitude) {
//                         try {
//                             console.log('hola4')
//                             await prisma.trajectories.createMany({
//                                 data: {
//                                     taxi_id: parseInt(taxi_id),
//                                     date: new Date(date),
//                                     latitude: parseFloat(latitude),
//                                     longitude: parseFloat(longitude),
//                                 }
//                             });
//                         } catch (error) {
//                             console.error(`Error al subir la data`, error);
//                         }
//                     }
//                 })
//                 await Promise.all(insertData);
//                 console.log('hola3')
//             });
//             readStream.on('end', resolve);
//             readStream.on('error', reject);
//         });
//       }
//   // });
//   console.log("All Data inserted successfully!");
//   process.exit(0);
// };
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readDirectoryTrajectories = (files, fileDir, prisma) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const txtFiles = files.filter((file) => path_1.default.extname(file) === ".txt");
        console.log("Filtered TXT files:", txtFiles);
        let linesProcessed = 0; // Contador de líneas procesadas
        for (const fileData of txtFiles) {
            const filePath = path_1.default.join(fileDir, fileData);
            console.log('Processing file:', filePath);
            const readStream = fs_1.default.createReadStream(filePath, { encoding: 'utf8' });
            let bufferData = "";
            yield new Promise((resolve, reject) => {
                readStream.on('data', (chunk) => __awaiter(void 0, void 0, void 0, function* () {
                    bufferData += chunk;
                    let lines = bufferData.split("\n");
                    bufferData = lines.pop() || "";
                    const insertData = lines.map((line) => __awaiter(void 0, void 0, void 0, function* () {
                        const [taxi_id, date, latitude, longitude] = line.split(',').map(part => part.trim());
                        if (taxi_id && date && latitude && longitude) {
                            console.log('Processing line:', { taxi_id, date, latitude, longitude });
                            try {
                                yield prisma.trajectories.create({
                                    data: {
                                        taxi_id: parseInt(taxi_id),
                                        date: new Date(date),
                                        latitude: parseFloat(latitude),
                                        longitude: parseFloat(longitude),
                                    }
                                });
                                linesProcessed++; // Incrementar contador de líneas procesadas
                            }
                            catch (error) {
                                console.error(`Error al subir la data`, error);
                            }
                        }
                    }));
                    yield Promise.all(insertData);
                }));
                readStream.on('end', () => __awaiter(void 0, void 0, void 0, function* () {
                    // Procesar cualquier dato restante en el buffer
                    if (bufferData.trim()) {
                        const lines = bufferData.split("\n").map(line => line.trim()).filter(line => line.length > 0);
                        const insertData = lines.map((line) => __awaiter(void 0, void 0, void 0, function* () {
                            const [taxi_id, date, latitude, longitude] = line.split(',').map(part => part.trim());
                            if (taxi_id && date && latitude && longitude) {
                                console.log('Processing line at end:', { taxi_id, date, latitude, longitude });
                                try {
                                    yield prisma.trajectories.create({
                                        data: {
                                            taxi_id: parseInt(taxi_id),
                                            date: new Date(date),
                                            latitude: parseFloat(latitude),
                                            longitude: parseFloat(longitude),
                                        }
                                    });
                                    console.log('subido');
                                    linesProcessed++; // Incrementar contador de líneas procesadas
                                }
                                catch (error) {
                                    console.error(`Error al subir la data`, error);
                                }
                            }
                        }));
                        yield Promise.all(insertData);
                    }
                    resolve();
                }));
                readStream.on('error', (err) => {
                    reject(err);
                });
            });
        }
        console.log(`Processed ${linesProcessed} lines.`); // Imprimir el total de líneas procesadas
        console.log("All Data inserted successfully!");
        // process.exit(0);
    }
    catch (error) {
        console.error('Error in readDirectoryTrajectories:', error);
        //     process.exit(1);
    }
});
exports.readDirectoryTrajectories = readDirectoryTrajectories;
// import fs from "fs";
// import path from "path";
// import { PrismaClient } from "@prisma/client";
// export const readDirectoryTrajectories = async (files: string[], fileDir: string, prisma: PrismaClient): Promise<void> => {
//   try {
//     const txtFiles = files.filter((file) => path.extname(file) === ".txt");
//     console.log("Filtered TXT files:", txtFiles);
//     for (const fileData of txtFiles) {
//       const filePath = path.join(fileDir, fileData);
//       console.log('Processing file:', filePath);
//       const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });
//       let bufferData = "";
//       await new Promise<void>((resolve, reject) => {
//         readStream.on('data', async (chunk) => {
//           bufferData += chunk;
//           let lines = bufferData.split("\n");
//           bufferData = lines.pop() || "";
//           const insertData = lines.map(async (line) => {
//             const [taxi_id, date, latitude, longitude] = line.split(',').map(part => part.trim());
//             if (taxi_id && date && latitude && longitude) {
//               console.log('Processing line:', { taxi_id, date, latitude, longitude });
//               try {
//                 await prisma.trajectories.create({
//                   data: {
//                     taxi_id: parseInt(taxi_id),
//                     date: new Date(date),
//                     latitude: parseFloat(latitude),
//                     longitude: parseFloat(longitude),
//                   }
//                 });
//               } catch (error) {
//                 console.error(`Error al subir la data`, error);
//               }
//             }
//           });
//           await Promise.all(insertData);
//         });
//         readStream.on('end', async () => {
//           if (bufferData.trim()) {
//             const lines = bufferData.split("\n").map(line => line.trim()).filter(line => line.length > 0);
//             const insertData = lines.map(async (line) => {
//               const [taxi_id, date, latitude, longitude] = line.split(',').map(part => part.trim());
//               if (taxi_id && date && latitude && longitude) {
//                 console.log('Processing line at end:', { taxi_id, date, latitude, longitude });
//                 try {
//                   await prisma.trajectories.create({
//                     data: {
//                       taxi_id: parseInt(taxi_id),
//                       date: new Date(date),
//                       latitude: parseFloat(latitude),
//                       longitude: parseFloat(longitude),
//                     }
//                   });
//                 } catch (error) {
//                   console.error(`Error al subir la data`, error);
//                 }
//               }
//             });
//             await Promise.all(insertData);
//           }
//           console.log('Finished processing file:', filePath);
//           resolve();
//         });
//         readStream.on('error', (err) => {
//           console.error('Error in readStream:', err);
//           reject(err);
//         });
//       });
//     }
//     console.log("All Data inserted successfully!");
//   } catch (error) {
//     console.error('Error in readDirectoryTrajectories:', error);
//     throw error;
//   }
// };
