import { beforeEach, describe, expect, test } from "vitest";

import { CreateGymService } from "./create-gym";

import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";

let gymRepository: InMemoryGymRepository;
let sut: CreateGymService;

describe("Create gym service", () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository();
        sut = new CreateGymService(gymRepository);
    });

    test("should be able to create gym", async () => {
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
