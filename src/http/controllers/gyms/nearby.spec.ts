import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Nearby gyms (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test("Should be able to list nearby gyms", async () => {
        const { token } = await createAndAuthenticateUser(app, true);

        await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "JS Gym",
            description: "Lore ypsilum",
            phone: "999999999",
            latitude: -11.29851,
            longitude: -14.66197,
        });

        await request(app.server).post("/gyms").set("Authorization", `Bearer ${token}`).send({
            title: "TS Gym",
            description: "Lore ypsilum",
            phone: "999999999",
            latitude: -25.71885,
            longitude: 75.76009,
        });

        const response = await request(app.server)
            .get("/gyms/nearby")
            .set("Authorization", `Bearer ${token}`)
            .query({
                latitude: -11.29851,
                longitude: -14.66197,
            });

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "JS Gym",
            }),
        ]);
    });
});
