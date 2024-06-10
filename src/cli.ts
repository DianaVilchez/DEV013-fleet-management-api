import {Command} from 'commander';
import fs from 'fs';
import path from 'path';
import {PrismaClient} from '@prisma/client';
import inquirer from 'inquirer';

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
    console.log("Starting upload process...");
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
    //path.join: une 2 directorio ,la ruta del proyecto y la ruta del archivo a subir
    // const fileDir = path.join(__dirname, options.path);
    const fileDir = options.path && path.resolve(options.path);
    console.log("Reading file from:", fileDir);


    const data = fs.readFileSync(fileDir, "utf8");
    console.log('data',data)

    const oneTaxi = data.split("\n");
    console.log('oneTaxis',oneTaxi);
    const allTaxis = oneTaxi.map((taxi) => {
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
    console.log("Data inserted successfully!");
    
  });

  program.parse(process.argv)

