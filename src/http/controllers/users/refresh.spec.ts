import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { app } from "@/app";

describe("Refresh-controller (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test("Should be able to refresh a token", async () => {
        await request(app.server)
            .post("/users")
            .send({ name: "Jhon doe", email: "johndoe@example.com", password: "12345678" });

        const authResponse = await request(app.server).post("/sessions").send({
            email: "johndoe@example.com",
            password: "12345678",
        });

        const cookies = authResponse.get("Set-Cookie");

        const response = await request(app.server).patch("/token/refresh").set("Cookie", cookies);

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual({
            token: expect.any(String),
        });
        expect(response.get("Set-Cookie")).toEqual([expect.stringContaining("refreshToken=")]);
    });
});
