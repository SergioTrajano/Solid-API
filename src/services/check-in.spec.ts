import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { CheckInService } from "./check-in";

let checkInRepository: InMemoryCheckInRepository;
let sut: CheckInService;

describe("Check in service", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new CheckInService(checkInRepository);

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            gymId: "gym-1",
            userId: "user-1",
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    test("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: "gym-01",
            userId: "user-01",
        });

        await expect(() =>
            sut.execute({
                gymId: "gym-01",
                userId: "user-01",
            })
        ).rejects.toBeInstanceOf(Error);
    });
});
