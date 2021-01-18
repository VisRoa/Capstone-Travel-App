import "babel-polyfill";


const req = require("supertest");
const serverLi = require("../src/server/serverTest");
describe("Server Testing", () => {
    test("test", async (done) => {
                
        const response = await req(serverLi).get('/test');
        expect(response.statusCode).toBe(200);
        done();
           
    });
  });

  