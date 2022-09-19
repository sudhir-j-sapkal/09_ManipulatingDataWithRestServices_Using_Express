const request = require('supertest');
const app = require('./app.js');

describe ("Test For Routes Testing", () => {
    test("should respond with a 200 status code", async () => {
        const response = await request(app).get("/boat/1");
        expect(response.statusCode).toBe(200)
    })
    test("should respond with correct Content Type header", async () => {
        const response = await request(app).get("/boat/1");
        expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
    })
    test("should respond with a 404 status code", async () => {
        const response = await request(app).get("/boat/220");
        expect(response.statusCode).toBe(404)
    })

    test("should respond with a data correct data", async () => {
        const response = await request(app).get("/boat/1");
        expect(response.body.color).toBe("red")
    })
    
    test("should respond with a 201 status code", async () => {
        var data = { brand : "XYZ", color : "yellow" }
        const response = await request(app).post("/boat/").send({ data : data});
        //console.log('Response :', response);
        expect(response.statusCode).toBe(201)
    })

    test("should respond with a Id last added", async () => {
        var data = { brand : "ABC", color : "green" }
        const response = await request(app).post("/boat/").send({ data : data});
        expect(response.body.id).toBe("4")
    })

    test("should respond with a data correct data", async () => {
        const response = await request(app).get("/boat/4");
        expect(response.body.color).toBe("green")
    })

    test("should respond with a 500  status code", async () => {
        const response = await request(app).post("/boat").send({});
        expect(response.statusCode).toBe(500)
    })
});
