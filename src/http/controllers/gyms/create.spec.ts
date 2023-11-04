import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create gym (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test("Should be able to create a gym", async () => {
        const { token } = await createAndAuthenticateUser(app, true);

        const response = await request(app.server)
            .post("/gyms")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "JS Gym",
                description: "Lore ypsilum",
                phone: "999999999",
                latitude: -11.29851,
                longitude: -14.66197,
            });

        expect(response.statusCode).toEqual(201);
    });
});
