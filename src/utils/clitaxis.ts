import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

export const readDirectoryTaxis = (files: string[], fileDir: string, prisma: PrismaClient): void => {
  //filtrar los archivos (solo los txt)
    const txtFiles = files.filter((file) => path.extname(file) === ".txt");
  console.log(txtFiles);

  txtFiles.forEach((file) => {
    const filePath = path.join(fileDir, file);

    const readStream = fs.createReadStream(filePath, "utf8");
     // const data = fs.readFileSync(fileDir, "utf8");
        // console.log('data',data)
    
    let bufferData = "";
    readStream.on("data",async (chunk) => {
    //   console.log("Iniciando el stream");
      bufferData += chunk;
      let lineTaxi = bufferData.split("\n");
      bufferData = lineTaxi.pop()!;
      const allTaxis = lineTaxi.map((taxi) => {
        const [id, plate] = taxi.split(",");
        return { id: parseInt(id.trim()), plate: plate.trim() };
      });
// console.log('allTaxis',allTaxis)
          // Insertar los datos en la base de datos
      for (const taxi of allTaxis) {
        await prisma.taxis.create({
          data: taxi,
        });
      }
    });

    readStream.on("end", async () => {
      if (bufferData) {
        let lineTaxi = bufferData.split("\n");
        const allTaxis = lineTaxi.map((taxi) => {
          const [id, plate] = taxi.split(",");
          return { id: parseInt(id.trim()), plate: plate.trim() };
        });
        for (const taxi of allTaxis) {
          await prisma.taxis.create({
            data: taxi,
          });
        }
      }
    //   console.log("Fin del stream");
    });

    // console.log("Data inserted successfully!");
  });
};