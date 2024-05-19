import request from "supertest";
// import { getTrajectories } from "../src/controllers/trajectories";
const app = require('../src/app');//para que se pueda usar supertest se llama al archivo principal
//-------------TAXIS----------------
describe("/GET/taxis", () => {
  it("Deberia devolver el listado de taxis paginado con las propiedades page y limit", async () => {
    const res = await request(app).get("/taxis")
    .query({ page: "1", limit: "10" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("page");
    expect(res.body).toHaveProperty("limit");
  });
  it("Deberia devolver el taxi obtenido con el taxi_id", async () => {
    const res = await request(app).get("/taxis").query({ taxi_id: 10133 });
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body).toHaveProperty("id");
    expect(res.body.id).toBe(10133);
  });
  it("Deberia devolver el taxi obtenido con el plate", async () => {
    const res = await request(app).get("/taxis").query({ plate: "FNHK-3772" });
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.plate).toEqual("FNHK-3772"); // Asegúrate de que la respuesta incluya la placa buscada
  });
  it("Debería devolver error 400 si 'plate' está vacío", async () => {
    const res = await request(app)
      .get("/taxis")
      .query({ plate: "", taxi_id: "" });
    console.log("Status Code:", res.status);
    console.log("Body:", res.body); // Esto te mostrará qué contiene realmente el cuerpo
    console.log("Text:", res.text); // Esto puede ayudar si body está vacío
    expect(res.status).toBe(400);
    expect(res.body).toEqual({ message: "Dato no insertado" });
  });
  it("Debería devolver error 404 si los datos son erroneos", async () => {
    const res = await request(app).get("/taxis").query({ plate: "FNHK-377" });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: "Taxi no encontrado" });
  });
  it("Deberia devolver error 500",async() => {
    const res = await request(app).get("/taxis");
    expect(res.status).toBe(500); 
    expect(res.body).toEqual({message:"Error en el servidor"});
  })

});

describe("GET /trajectories",() =>{
  //-------------TRAJECTORIES(For taxi-id and date)----------------
  it("It should return all the trajectories of the corresponding taxi_id" ,async()=> {
    const res = await request(app)
       .get("/trajectories")
       .query({taxi_id:10133,page:1 , limit:10});
       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty('data');
       expect(res.body).toHaveProperty("page");
       expect(res.body).toHaveProperty("limit");
  });

  it("It should return all the trajectories of the corresponding taxi_id" ,async()=> {
    const res = await request(app)
       .get("/trajectories")
       .query({date:"2008-02-04",page:1 , limit:10});
       expect(res.status).toBe(200);
      //  expect(res.body.id).every(10133);
  });

  it("It should return all the trajectories of the corresponding taxi_id" ,async()=> {
    const res = await request(app)
       .get("/trajectories")
       .query({taxi_id:"",date:"",page:1 , limit:10});
       expect(res.status).toBe(400);
       expect(res.body).toEqual({ message: "Dato no insertado" });
  });

  it("It should return all the trajectories of the corresponding taxi_id" ,async()=> {
    const res = await request(app)
       .get("/trajectories")
       .query({taxi_id:1013,page:1 , limit:10});
       expect(res.status).toBe(404);
       expect(res.body).toEqual({ message: "No se encontraron datos" });
  });

  it("It should return all the trajectories of the corresponding taxi_id" ,async()=> {
    const res = await request(app)
       .get("/trajectories")
       .query({date:"2028-02-04",page:1 , limit:10});
       expect(res.status).toBe(404);
       expect(res.body).toEqual({ message: "No se encontraron datos" });
  });

  it("It should return all the trajectories of the corresponding taxi_id" ,async()=> {
    const res = await request(app)
       .get("/trajectories")
       .query({date:"2028-02-04", limit:10});
       expect(res.status).toBe(500);
       expect(res.body).toEqual({ message: "Error en el servidor" });
  });

    //-------------LAST TRAJECTORIES----------------
   
    it.only("It should return all the last trajectories of each taxi with a default pagination" ,async()=> {
      const res = await request(app)
         .get("/trajectories/latest");
         expect(res.status).toBe(200);
         expect(res.body).toHaveProperty('pageLastTrajectories');
         expect(res.body).toHaveProperty("page");
         expect(res.body).toHaveProperty("limit");
    });
});