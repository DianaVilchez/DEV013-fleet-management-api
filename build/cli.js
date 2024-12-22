"use strict";
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
const commander_1 = require("commander");
const fs_1 = __importDefault(require("fs"));
// import path from 'path';
const client_1 = require("@prisma/client");
const inquirer_1 = __importDefault(require("inquirer"));
const clitaxis_1 = require("./utils/clitaxis");
const clitrajectories_1 = require("./utils/clitrajectories");
const program = new commander_1.Command();
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
    .action((options) => __awaiter(void 0, void 0, void 0, function* () {
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
    const answers = yield inquirer_1.default.prompt(passwordQue);
    const { password } = answers;
    console.log("Password received at: ", new Date().toISOString());
    const prisma = new client_1.PrismaClient({
        datasources: {
            db: {
                url: `postgresql://${options.username}:${password}@${options.host}:${options.port}/${options.dbname}`,
            },
        },
    });
    // la ruta de la carpeta:C:\Users\Diana\Desktop\data\trajectoriesw
    const fileDir = options.path;
    console.log("Reading file from:", fileDir);
    //archivos que sube o lee .txt  : [ '1.txt', '2.txt' ]
    // const files = fs.readdirSync(fileDir);
    if (options.type === 'taxis') {
        console.log('taxis leyendo');
        //.readdir : se usa para leer un directorio (con mas de un archivo)
        try {
            const files = yield fs_1.default.promises.readdir(fileDir);
            (0, clitaxis_1.readDirectoryTaxis)(files, fileDir, prisma);
        }
        catch (err) {
            console.error('Error leyendo el directorio', err);
        }
    }
    if (options.type === 'trajectories') {
        console.log('trajectories leyendo');
        try {
            const files = yield fs_1.default.promises.readdir(fileDir);
            yield (0, clitrajectories_1.readDirectoryTrajectories)(files, fileDir, prisma);
        }
        catch (err) {
            console.error('Error leyendo el directorio', err);
        }
        if (!fs_1.default.existsSync(fileDir)) {
            console.error(`Taxis file does not exist: ${fileDir}`);
        }
        console.log('hola');
        yield prisma.$disconnect();
        console.log("Data upload completed successfully.");
    }
    console.log('hola2');
}));
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
