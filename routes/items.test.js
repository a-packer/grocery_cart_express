process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
leitems = require("../fakeDb");


let pickles = { name: "Pickles" };

beforeEach(function () {
  items.push(pickles);
});

afterEach(function () {
  // make sure this *mutates*, not redefines, `items`
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ items: [pickles] })
  })
})

describe("GET /items/:name", () => {
  test("Get item by name", async () => {
    const res = await request(app).get(`/items/${pickles.name}`);
    expect(res.statusCode).toBe(200)
    expect(res.body).toEqual({ item: pickles })
  })
  test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/items/icecube`);
    expect(res.statusCode).toBe(404)
  })
})

describe("POST /items", () => {
  test("Creating a item", async () => {
    const res = await request(app).post("/items").send({ name: "Ball", price: 4.90 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ item: { name: "Ball", price: 4.90 } });
  })
})

describe("/PATCH /items/:name", () => {
  test("Updating a item's price", async () => {
    const res = await request(app).patch(`/items/${pickles.name}`).send({ name: pickles.name, price: 0.90 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: pickles.name , price: 0.90 } });
  })
  test("Responds with 404 for invalid name", async () => {
    const res = await request(app).patch(`/items/Piggles`).send({ name: "Monster" });
    expect(res.statusCode).toBe(404);
  })
})

describe("/DELETE /items/:name", () => {
  test("Deleting a item", async () => {
    const res = await request(app).delete(`/items/${pickles.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Deleted' })
  })
  test("Responds with 404 for deleting invalid item", async () => {
    const res = await request(app).delete(`/items/hamface`);
    expect(res.statusCode).toBe(404);
  })
})

