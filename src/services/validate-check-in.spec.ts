import { beforeEach, describe, expect, test } from "vitest";

import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";

import { ValidateCheckInService } from "./validate-check-in";

import { ResourceNotFoundError } from "./errors/resource-not-found";

let checkInRepository: InMemoryCheckInRepository;
let sut: ValidateCheckInService;

describe("Validate check-in service", () => {
    beforeEach(() => {
        checkInRepository = new InMemoryCheckInRepository();
        sut = new ValidateCheckInService(checkInRepository);
    });

    test("should be able to validate check-in", async () => {
        const createdCheckIn = await checkInRepository.create({
            gym_id: "gym-1",
            user_id: "user-1",
        });

        const { checkIn: validatedCheckIn } = await sut.execute({
            checkInId: createdCheckIn.id,
        });

        expect(validatedCheckIn.validated_at).toEqual(expect.any(Date));
    });

    test("should not be able to validate inexistent check-in", async () => {
        await expect(() =>
            sut.execute({
                checkInId: "inexistent-id",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
