import { beforeEach, describe, expect, test } from "vitest";

import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";
import { GetUserMetricsService } from "./get-user-metrics";

let checkInRepository: InMemoryCheckInRepository;
let sut: GetUserMetricsService;

describe("Get user metrics service", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new GetUserMetricsService(checkInRepository);
    });

    test("should be able to get user check in count from metrics", async () => {
        await checkInRepository.create({
            gym_id: "gym-1",
            user_id: "user-1",
        });
        await checkInRepository.create({
            gym_id: "gym-2",
            user_id: "user-1",
        });

        const { checkInCount } = await sut.execute({ userId: "user-1" });

        expect(checkInCount).toEqual(2);
    });

    test.skip("should be able to get user profile with wrong id", async () => {
        await expect(() =>
            sut.execute({
                userId: "no-existing-id",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
