import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { app } from "@/app";

describe("Profile (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test("Should be able to get user profile", async () => {
        await request(app.server)
            .post("/users")
            .send({ name: "Jhon doe", email: "johndoe@example.com", password: "12345678" });

        const authResponse = await request(app.server).post("/sessions").send({
            email: "johndoe@example.com",
            password: "12345678",
        });

        const { token } = authResponse.body;

        const profileResponse = await request(app.server)
            .get("/me")
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(profileResponse.statusCode).toEqual(200);
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: "johndoe@example.com",
            })
        );
    });
});