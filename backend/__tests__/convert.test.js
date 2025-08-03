import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import { convertNumberToWords } from "../controllers/convertController.js";

const app = express();
app.use(bodyParser.json());
app.post("/api/convert", convertNumberToWords);

describe("POST /api/convert", () => {
  test("valid whole number", async () => {
    const res = await request(app).post("/api/convert").send({ amount: "123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.words).toBe("ONE HUNDRED AND TWENTY-THREE DOLLARS");
  });

  test("valid with cents", async () => {
    const res = await request(app)
      .post("/api/convert")
      .send({ amount: "45.67" });
    expect(res.statusCode).toBe(200);
    expect(res.body.words).toBe("FORTY-FIVE DOLLARS AND SIXTY-SEVEN CENTS");
  });

  test("zero", async () => {
    const res = await request(app).post("/api/convert").send({ amount: "0" });
    expect(res.statusCode).toBe(200);
    expect(res.body.words).toBe("ZERO DOLLARS");
  });

  test("only cents", async () => {
    const res = await request(app)
      .post("/api/convert")
      .send({ amount: "0.99" });
    expect(res.statusCode).toBe(200);
    expect(res.body.words).toBe("NINETY-NINE CENTS");
  });

  test("large number", async () => {
    const res = await request(app)
      .post("/api/convert")
      .send({ amount: "123456789" });
    expect(res.statusCode).toBe(200);
    expect(res.body.words).toBe(
      "ONE HUNDRED AND TWENTY-THREE MILLION FOUR HUNDRED AND FIFTY-SIX THOUSAND SEVEN HUNDRED AND EIGHTY-NINE DOLLARS"
    );
  });

  test("negative number", async () => {
    const res = await request(app)
      .post("/api/convert")
      .send({ amount: "-123" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain(
      "Invalid amount. Must be a positive number."
    );
  });

  test("non-numeric input", async () => {
    const res = await request(app).post("/api/convert").send({ amount: "abc" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain(
      "Invalid amount. Must be a positive number."
    );
  });

  test("number too large", async () => {
    const res = await request(app)
      .post("/api/convert")
      .send({ amount: "1000000000000" });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toContain(
      "Number too large to convert — exceeds supported range."
    );
  });
});
