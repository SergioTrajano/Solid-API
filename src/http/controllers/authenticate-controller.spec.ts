import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { app } from "@/app";

describe("Authenticate-controller (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test("Should be able to authenticate", async () => {
        await request(app.server)
            .post("/users")
            .send({ name: "Jhon doe", email: "johndoe@example.com", password: "12345678" });

        const response = await request(app.server).post("/sessions").send({
            email: "johndoe@example.com",
            password: "12345678",
        });

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String),
        });
    });
});
