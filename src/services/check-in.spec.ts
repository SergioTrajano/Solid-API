import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";
import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { CheckInService } from "./check-in";
import { MaxDistanceError } from "./errors/max-distance-error";
import { MaxNumberOfCheckInsError } from "./errors/max-number-of-check-ins";

let checkInRepository: InMemoryCheckInRepository;
let gymRepository: InMemoryGymRepository;
let sut: CheckInService;

describe("Check in service", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        gymRepository = new InMemoryGymRepository();
        sut = new CheckInService(checkInRepository, gymRepository);

        gymRepository.create({
            id: "gym-1",
            description: "",
            title: "Gym",
            phoneNumber: "",
            latitude: 0,
            longitude: 0,
        });

        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    test("should be able to check in", async () => {
        const { checkIn } = await sut.execute({
            gymId: "gym-1",
            userId: "user-1",
            userLatitude: 0,
            userLongitude: 0,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    test("should not be able to check in twice in the same day", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: "gym-1",
            userId: "user-01",
            userLatitude: 0,
            userLongitude: 0,
        });

        await expect(() =>
            sut.execute({
                gymId: "gym-1",
                userId: "user-01",
                userLatitude: 0,
                userLongitude: 0,
            })
        ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError);
    });

    test("should be able to check in twice but in different days", async () => {
        vi.setSystemTime(new Date(2022, 0, 20, 8, 0, 0));

        await sut.execute({
            gymId: "gym-1",
            userId: "user-01",
            userLatitude: 0,
            userLongitude: 0,
        });

        vi.setSystemTime(new Date(2022, 0, 21, 8, 0, 0));

        const { checkIn } = await sut.execute({
            gymId: "gym-1",
            userId: "user-01",
            userLatitude: 0,
            userLongitude: 0,
        });

        expect(checkIn.id).toEqual(expect.any(String));
    });

    test("should not be able to check in far away from gym", async () => {
        gymRepository.gyms.push({
            id: "gym-2",
            description: "",
            latitude: new Decimal(56.24267),
            longitude: new Decimal(145.8227),
            phoneNumber: "",
            title: "",
        });

        await expect(() =>
            sut.execute({
                gymId: "gym-2",
                userId: "user-01",
                userLatitude: 0,
                userLongitude: 0,
            })
        ).rejects.toBeInstanceOf(MaxDistanceError);
    });
});
