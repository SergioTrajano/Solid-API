import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Create Check-in (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test("Should be able to create a check-in", async () => {
        const { token } = await createAndAuthenticateUser(app);

        const gym = await prisma.gym.create({
            data: {
                title: "JS Gym",
                description: "Lore ypsilum",
                phoneNumber: "999999999",
                latitude: -11.29851,
                longitude: -14.66197,
            },
        });

        const response = await request(app.server)
            .post(`/gyms/${gym.id}/check-ins`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                latitude: -11.29851,
                longitude: -14.66197,
            });

        expect(response.statusCode).toEqual(201);
    });
});
