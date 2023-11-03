import request from "supertest";
import { afterAll, beforeAll, describe, expect, test } from "vitest";

import { app } from "@/app";
import { prisma } from "@/lib/prisma";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe("Check-in History (e2e)", () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    test("Should be able to get check-in history", async () => {
        const { token } = await createAndAuthenticateUser(app);

        const user = await prisma.user.findFirstOrThrow();

        const gym = await prisma.gym.create({
            data: {
                title: "JS Gym",
                description: "Lore ypsilum",
                phoneNumber: "999999999",
                latitude: -11.29851,
                longitude: -14.66197,
            },
        });

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
                {
                    gym_id: gym.id,
                    user_id: user.id,
                },
            ],
        });

        const response = await request(app.server)
            .get("/check-ins/history")
            .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toEqual(200);
        expect(response.body.checkIns).toEqual([
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
            }),
            expect.objectContaining({
                gym_id: gym.id,
                user_id: user.id,
            }),
        ]);
    });
});
