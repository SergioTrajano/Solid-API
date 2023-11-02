import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { app } from "@/app";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Search gym (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test("Should be able to search gyms", async () => {
        const { token } = await createAndAuthenticateUser(app);

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
            .get("/gyms/search")
            .query({ query: "JS" })
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
        expect(response.body.gyms).toHaveLength(1);
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: "JS Gym",
            }),
        ]);
    });
});
