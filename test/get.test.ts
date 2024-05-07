import request from "supertest";
// import { getTrajectories } from "../src/controllers/trajectories";
const app = require('../src/app');//para que se pueda usar supertest se llama al archivo principal

// describe('GET /trajectories', () => {
//   it('It should return all the trajectories of the corresponding taxi_id.',() => (
//     fetch('/trajectories').then((res) => expect(res.status).toBe(200))
//   ))
// })

describe("GET /trajectories",() =>{
  it("It should return all the trajectories of the corresponding taxi_id" ,async()=> {
    const res = await request(app)
       .get("/trajectories")
       .query({taxi_id:10133});
       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty('data');
  });

  it("It should return all the trajectories of the corresponding taxi_id" ,async()=> {
    const res = await request(app)
       .get("/trajectories")
       .query({date:"2008-02-04"});
       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty('data');
  });

  it("It should return all the trajectories of the corresponding taxi_id" ,async()=> {
    const res = await request(app)
       .get("/trajectories")
       .query({taxi_id:10133,date:"2008-02-04"});
       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty('data');
  });
});
describe("/GET/taxis",() =>{
  it("Deberia las lista de datos de taxis, su id y plate" ,async()=> {
       const res = await request(app)
       .get("/taxis");
       expect(res.status).toBe(200);
       expect(res.body).toHaveProperty('data');
  });
  it("Deberia devolver el taxi obtenido con el taxi_id" ,async()=> {
    const res = await request(app)
    .get("/taxis")
    .query({taxi_id:10133});
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.body.id).toBe(10133);

  });
  it("Deberia devolver el taxi obtenido con el plate" ,async()=> {
  const res = await request(app)
  .get("/taxis")
  .query({plate:"FNHK-3772"});
  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.plate).toEqual("FNHK-3772"); // Asegúrate de que la respuesta incluya la placa buscada
  });
  // it("Debería devolver error 400 si 'plate' está vacío", async () => {
  //     const res = await request(app)
  //       .get("/taxis")
  //       .query({ plate: "" });
  //       console.log("Status Code:", res.status);
  //       console.log("Body:", res.body);  // Esto te mostrará qué contiene realmente el cuerpo
  //       console.log("Text:", res.text);  // Esto puede ayudar si body está vacío
  //     expect(res.status).toBe(400);
  //     expect(res.body).toEqual({ message: "Dato no insertado" });
  //   });
    it("Debería devolver error 400 si 'plate' está vacío", async () => {
      const res = await request(app)
        .get("/taxis")
        .query({ plate: "" , taxi_id: "" });
        console.log("Status Code:", res.status);
        console.log("Body:", res.body);  // Esto te mostrará qué contiene realmente el cuerpo
        console.log("Text:", res.text);  // Esto puede ayudar si body está vacío
      expect(res.status).toBe(400);
      expect(res.body).toEqual({ message: "Dato no insertado" });
    });
    it("Debería devolver error 400 si 'plate' está vacío", async () => {
      const res = await request(app)
        .get("/taxis")
        .query({ plate: "FNHK-377"});
        expect(res.status).toBe(404);
      expect(res.body).toEqual({ message: "Taxi no encontrado" });
    });
  
  // it('debería manejar un error interno del servidor',async() => {
  //       const res =await(app)
  //       .get("/taxis");
  //       // expect(res.status).toBe(500);
  //       expect(res.body).toHaveProperty('message','Error en el servidor');
  // });
});