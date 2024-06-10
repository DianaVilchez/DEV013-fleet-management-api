// import {Command} from 'commander';
// import fs from 'fs';
// import path from 'path';
// import {PrismaClient} from '@prisma/client';
// import inquirer from 'inquirer';
const startLoadCommander = performance.now();
import { Command } from 'commander';
const endLoadCommander = performance.now();
console.log("Loaded commander at: ", new Date().toISOString(), "Duration: ", endLoadCommander - startLoadCommander, "ms");
const startLoadFs = performance.now();
import fs from 'fs';
const endLoadFs = performance.now();
console.log("Loaded fs at: ", new Date().toISOString(), "Duration: ", endLoadFs - startLoadFs, "ms");
const startLoadPath = performance.now();
import path from 'path';
const endLoadPath = performance.now();
console.log("Loaded path at: ", new Date().toISOString(), "Duration: ", endLoadPath - startLoadPath, "ms");
const startLoadPrismaClient = performance.now();
import { PrismaClient } from '@prisma/client';
const endLoadPrismaClient = performance.now();
console.log("Loaded PrismaClient at: ", new Date().toISOString(), "Duration: ", endLoadPrismaClient - startLoadPrismaClient, "ms");
const startLoadInquirer = performance.now();
import inquirer from 'inquirer';
const endLoadInquirer = performance.now();
console.log("Loaded inquirer at: ", new Date().toISOString(), "Duration: ", endLoadInquirer - startLoadInquirer, "ms");
// const { prompt } = require('inquirer');
console.log("Script started at: ", new Date().toISOString());
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
        type: 'password',
        name: 'password',
        message: '¿Cuál es la contraseña?',
        mask: '*',
      }]
      const answers = await inquirer.prompt(passwordQue);
      const { password } = answers;
      console.log("Password received at: ", new Date().toISOString());
      console.log(password)
      const prisma = new PrismaClient({
      datasources: {
        db: {
          url: `postgresql://${options.username}:${password}@${options.host}:${options.port}/${options.dbname}`,
        },
      },
    });
    // const fileDir = path.join(__dirname, options.path);
    const fileDir = options.path && path.resolve(options.path);
    console.log("Reading file from:", fileDir);
    const readStream = fs.createReadStream(fileDir, "utf8")
    // const data = fs.readFileSync(fileDir, "utf8");
    // console.log('data',data)
    let bufferData = '';
    readStream.on('data', async(chunk) => {
      console.log('Iniciando el stream');
      bufferData += chunk;
      let lineTaxi = bufferData.split("\n");
      bufferData = lineTaxi.pop()!;
    const allTaxis = lineTaxi.map((taxi) => {
      const [id, plate] = taxi.split(",");
      return { id: parseInt(id.trim()), plate: plate.trim() };
    });
    console.log('allTaxis',allTaxis)
    // Insertar los datos en la base de datos
    for (const taxi of allTaxis) {
      await prisma.taxis.create({
        data: taxi,
      });
    }
    })
    
    readStream.on('end', async () => {
      if(bufferData){
        let lineTaxi = bufferData.split("\n");
        const allTaxis = lineTaxi.map((taxi) => {
          const [id, plate] = taxi.split(",");
          return { id: parseInt(id.trim()), plate: plate.trim() };
        });
        console.log('allTaxis',allTaxis)
        // Insertar los datos en la base de datos
        for (const taxi of allTaxis) {
          await prisma.taxis.create({
            data: taxi,
          });
        }
      }
      console.log('Fin del stream')
    })
    
    console.log("Data inserted successfully!");
    
  });
  program.parse(process.argv)
  console.log("Script execution finished at: ", new Date().toISOString());
