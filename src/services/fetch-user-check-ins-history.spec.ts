import { beforeEach, describe, expect, test } from "vitest";

import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";

import { FetchUserCheckInsHistoryService } from "./fetch-user-check-ins-history";

let checkInRepository: InMemoryCheckInRepository;
let sut: FetchUserCheckInsHistoryService;

describe("Check in service", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new FetchUserCheckInsHistoryService(checkInRepository);
    });

    test("should be able to fetch check-in history", async () => {
        await checkInRepository.create({
            gym_id: "gym-1",
            user_id: "user-1",
        });
        await checkInRepository.create({
            gym_id: "gym-2",
            user_id: "user-1",
        });

        const { checkIns } = await sut.execute({ userId: "user-1", page: 1 });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({
                gym_id: "gym-1",
            }),
            expect.objectContaining({
                gym_id: "gym-2",
            }),
        ]);
    });

    test("should be able to fetch paginated check-in history", async () => {
        for (let i = 1; i <= 22; i++) {
            await checkInRepository.create({
                gym_id: `gym-${i}`,
                user_id: "user-1",
            });
        }

        const { checkIns } = await sut.execute({ userId: "user-1", page: 2 });

        expect(checkIns).toHaveLength(2);
        expect(checkIns).toEqual([
            expect.objectContaining({
                gym_id: "gym-21",
            }),
            expect.objectContaining({
                gym_id: "gym-22",
            }),
        ]);
    });
});
