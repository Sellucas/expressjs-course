import request from "supertest";
import mongoose from "mongoose";
import { createApp } from "../createApp.mjs";

describe("create user and login", () => {
  let app;
  beforeAll(() => {
    mongoose
      .connect("mongodb://localhost:27017/express-tutorial-test")
      .then(() => {
        console.log("Connected to test MongoDB");
      })
      .catch((err) => {
        console.log(err);
      });
    app = createApp();
  });

  it("should create a user", async () => {
    const res = await request(app).post("/api/users").send({
      name: "user test",
      displayname: "user test displayname",
      email: "test@test.com",
      password: "123456",
    });
    expect(res.statusCode).toBe(201);
  });

  it("should login the user and visit /api/auth/status and return authenticated user", async () => {
    const res = await request(app)
      .post("/api/auth")
      .send({
        email: "test@test.com",
        password: "123456",
      })
      .then((res) =>
        request(app)
          .get("/api/auth/status")
          .set("Cookie", res.headers["set-cookie"])
      );
    expect(res.statusCode).toBe(200);
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  });
});
