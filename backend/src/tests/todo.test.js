const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../server");
const Todo = require("../models/Todo");

let mongd;

beforeAll(async ()=>{
    mongd = await MongoMemoryServer.create();
    const uri = mongd.getUri();
    await mongoose.connect(uri);
});

afterAll(async ()=> {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongd.stop();
});

afterEach(async ()=>{
    await Todo.deleteMany({});
});

describe("Todo API", ()=> {
    test("Post /api/todos create a todo", async ()=> {
        const res = await request(app).post("/api/todos").send({ title: "Learn Testing"});
        expect(res.statusCode).toBe(201);
        expect(res.body).toMatchObject({ title: "Learn Testing", completed: false });
    });

    test("GET /api/todos returns list", async () => {
        await Todo.create({ title: "A" });
        await Todo.create({ title: "B" });
        const res = await request(app).get("/api/todos");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(2);
    });

    test("PUT /api/todos/:id toggles completed", async () => {
        const todo = await Todo.create({ title: "Toggle me" });
        const res = await request(app).put(`/api/todos/${todo._id}`).send({ completed: true });
        expect(res.statusCode).toBe(200);
        expect(res.body.completed).toBe(true);
    });


    test("DELETE /api/todos/:id removes todo", async () => {
        const todo = await Todo.create({ title: "Delete me" });
        const res = await request(app).delete(`/api/todos/${todo._id}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "Deleted" });
        const remain = await Todo.findById(todo._id);
        expect(remain).toBeNull();
    });

})