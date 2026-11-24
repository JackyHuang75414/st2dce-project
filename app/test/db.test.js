import test from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import app from "../app.js";

test("GET /ready answers 503 without a database", async () => {
  const response = await request(app).get("/ready");

  assert.equal(response.status, 503);
});

test("GET /items answers 503 without a database", async () => {
  const response = await request(app).get("/items");

  assert.equal(response.status, 503);
});

test("POST /items answers 400 without a name", async () => {
  const response = await request(app).post("/items").send({});

  assert.equal(response.status, 400);
});
