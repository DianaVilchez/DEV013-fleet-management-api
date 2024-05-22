import json2xls from 'json2xls';
import fs from 'fs';
import path from 'path';

// Exportación por defecto de la función
export default function createExcelData(data: any[], fileName: string): string {
    const xls = json2xls(data);
    const filePath = path.join(__dirname, fileName);

    fs.writeFileSync(filePath, xls, 'binary');
    return filePath;
}

