import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { app } from "@/app";

describe("User-controller (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test("Should be able to register", async () => {
        const response = await request(app.server)
            .post("/users")
            .send({ name: "Jhona doe", email: "johndoe@example.com", password: "12345678" });

        expect(response.statusCode).toEqual(201);
    });
});
