import { beforeEach, describe, expect, test } from "vitest";

import { CreateGymService } from "./create-gym";

import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";

let gymRepository: InMemoryGymRepository;
let sut: CreateGymService;

describe("Get user profile service", () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository();
        sut = new CreateGymService(gymRepository);
    });

    test("should be able to get user profile", async () => {
        const { gym } = await sut.register({
            description: "",
            title: "Gym",
            phoneNumber: "",
            latitude: 0,
            longitude: 0,
        });

        expect(gym.id).toEqual(expect.any(String));
    });
});
