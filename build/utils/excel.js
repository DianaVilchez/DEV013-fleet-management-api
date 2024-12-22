"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const json2xls_1 = __importDefault(require("json2xls"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Exportación por defecto de la función
function createExcelData(data, fileName) {
    const xls = (0, json2xls_1.default)(data);
    const filePath = path_1.default.join(__dirname, fileName);
    fs_1.default.writeFileSync(filePath, xls, 'binary');
    return filePath;
}
exports.default = createExcelData;
