import request from "supertest";
import express from "express";
import router from "../src/routes/api";

const app = express();
app.set("query parser", (queryString: any) => new URLSearchParams(queryString));
app.use("/", router);
describe("Should test /getLocation", function () {
  it("success", async () => {
    window.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ foo: "foo" }),
    });
    const res = await request(app).get("/getLocation").query({ ip: "" });
    expect(res.statusCode).toBe(200);
    expect(res.text).toEqual('{"foo":"foo"}');
  });

  it("server  error", async () => {
    window.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ foo: "foo" }),
    });
    const res = await request(app).get("/getLocation").query({ ip: "" });
    expect(res.statusCode).toBe(500);
    expect(res.text).toEqual("Internal Server Error");
  });
  it("bad ip  error", async () => {
    window.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ foo: "foo" }),
    });
    const res = await request(app)
      .get("/getLocation")
      .query({ ip: "dfg.sdf.sdf.sdf" });
    expect(res.statusCode).toBe(400);
    expect(res.text).toEqual("Invalid IP address");
  });

  it("bad ip  error", async () => {
    window.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () => Promise.resolve({ foo: "foo" }),
    });
    const res = await request(app)
      .get("/getLocation")
      .set("x-forwarded-for", "")
      .query({ ip: "" });
    expect(res.statusCode).toBe(400);
    expect(res.text).toEqual("Unable to determine client IP address");
  });
});
