import {Command} from 'commander';
import fs from 'fs';
// import path from 'path';
import {PrismaClient} from '@prisma/client';
import inquirer from 'inquirer';
import {readDirectoryTaxis} from './utils/clitaxis'
import { readDirectoryTrajectories } from './utils/clitrajectories';

const program = new Command();
program
  .version("1.0.0")
  .command("upload")
  .description("Subir datos a las tablas")
  .option("-p, --path <path-to-files>")
  .option("--type <table-name>")
  .option("--dbname <dbname>")
  .option("--host <host>")
  .option("--port <port>")
  .option("--username <username>")
  //   .option('--password <password>')
  .action(async (options) => {
    console.log("Upload command invoked at: ", new Date().toISOString());
    console.log("Starting upload process...");
    console.log("Prompting for password at: ", new Date().toISOString());
    //path.join: une 2 directorio ,la ruta del proyecto y la ruta del archivo a subir
    const passwordQue = [
      {
        type: "password",
        name: "password",
        message: "¿Cuál es la contraseña?",
        mask: "*",
      },
    ];
    const answers = await inquirer.prompt(passwordQue);
    const { password } = answers;
    console.log("Password received at: ", new Date().toISOString());
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: `postgresql://${options.username}:${password}@${options.host}:${options.port}/${options.dbname}`,
        },
      },
    });
    // la ruta de la carpeta:C:\Users\Diana\Desktop\data\trajectoriesw
    const fileDir = options.path ;
    console.log("Reading file from:", fileDir);
    //archivos que sube o lee .txt  : [ '1.txt', '2.txt' ]
    // const files = fs.readdirSync(fileDir);

    if ( options.type === 'taxis') {
      console.log('taxis leyendo')
      //.readdir : se usa para leer un directorio (con mas de un archivo)
      try {
      const files = await fs.promises.readdir(fileDir);
        readDirectoryTaxis(files, fileDir, prisma);  
      } catch (err) {
        console.error('Error leyendo el directorio', err);
      }
     
    }
    if(options.type === 'trajectories'){
      console.log('trajectories leyendo')
      try {
      const files = await fs.promises.readdir(fileDir);
        await readDirectoryTrajectories(files, fileDir, prisma);
      } 
      catch (err) {
        console.error('Error leyendo el directorio', err);
      }
      if (!fs.existsSync(fileDir)) {
        console.error(`Taxis file does not exist: ${fileDir}`);
        
    }
    console.log('hola')
    await prisma.$disconnect();
      console.log("Data upload completed successfully."); 
}
console.log('hola2')
  });
program.parse(process.argv);
console.log("El proceso ha terminado: ", new Date().toISOString());


// const startLoadCommander = performance.now();
// import { Command } from "commander";
// const endLoadCommander = performance.now();
// console.log("Loaded commander at: ",new Date().toISOString(),"Duration: ",endLoadCommander - startLoadCommander,"ms");
// const startLoadFs = performance.now();
// import fs from "fs";
// const endLoadFs = performance.now();
// console.log("Loaded fs at: ",new Date().toISOString(),"Duration: ",endLoadFs - startLoadFs,"ms");
// const startLoadPath = performance.now();
// import path from "path";
// const endLoadPath = performance.now();
// console.log("Loaded path at: ",new Date().toISOString(),"Duration: ",endLoadPath - startLoadPath,"ms");
// const startLoadPrismaClient = performance.now();
// import { PrismaClient } from "@prisma/client";
// const endLoadPrismaClient = performance.now();
// console.log("Loaded PrismaClient at: ",new Date().toISOString(),"Duration: ",endLoadPrismaClient - startLoadPrismaClient,"ms");
// const startLoadInquirer = performance.now();
// import inquirer from "inquirer";
// const endLoadInquirer = performance.now();
// console.log("Loaded inquirer at: ",new Date().toISOString(),"Duration: ",endLoadInquirer - startLoadInquirer,"ms");
// // const { prompt } = require('inquirer');
// console.log("Script started at: ", new Date().toISOString());