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
exports.readDirectoryTaxis = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const readDirectoryTaxis = (files, fileDir, prisma) => {
    //filtrar los archivos (solo los txt)
    const txtFiles = files.filter((file) => path_1.default.extname(file) === ".txt");
    console.log(txtFiles);
    txtFiles.forEach((file) => {
        const filePath = path_1.default.join(fileDir, file);
        const readStream = fs_1.default.createReadStream(filePath, "utf8");
        // const data = fs.readFileSync(fileDir, "utf8");
        // console.log('data',data)
        let bufferData = "";
        readStream.on("data", (chunk) => __awaiter(void 0, void 0, void 0, function* () {
            //   console.log("Iniciando el stream");
            bufferData += chunk;
            let lineTaxi = bufferData.split("\n");
            bufferData = lineTaxi.pop();
            const allTaxis = lineTaxi.map((taxi) => {
                const [id, plate] = taxi.split(",");
                return { id: parseInt(id.trim()), plate: plate.trim() };
            });
            // console.log('allTaxis',allTaxis)
            // Insertar los datos en la base de datos
            for (const taxi of allTaxis) {
                yield prisma.taxis.create({
                    data: taxi,
                });
            }
        }));
        readStream.on("end", () => __awaiter(void 0, void 0, void 0, function* () {
            if (bufferData) {
                let lineTaxi = bufferData.split("\n");
                const allTaxis = lineTaxi.map((taxi) => {
                    const [id, plate] = taxi.split(",");
                    return { id: parseInt(id.trim()), plate: plate.trim() };
                });
                for (const taxi of allTaxis) {
                    yield prisma.taxis.create({
                        data: taxi,
                    });
                }
            }
            //   console.log("Fin del stream");
        }));
        // console.log("Data inserted successfully!");
    });
};
exports.readDirectoryTaxis = readDirectoryTaxis;
