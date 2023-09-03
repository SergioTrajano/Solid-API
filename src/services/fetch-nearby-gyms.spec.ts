import { beforeEach, describe, expect, test } from "vitest";

import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { FetchNearbyGymsService } from "./fetch-nearby-gyms";

let gymRepository: InMemoryGymRepository;
let sut: FetchNearbyGymsService;

describe("Fetch nearby gyms service", () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository();
        sut = new FetchNearbyGymsService(gymRepository);
    });

    test("should be able to search for nearby gyms", async () => {
        await gymRepository.create({
            description: "",
            title: "Near Gym",
            phoneNumber: "",
            latitude: 28.82561,
            longitude: 104.98472,
        });
        await gymRepository.create({
            description: "",
            title: "Far Gym",
            phoneNumber: "",
            latitude: 37.84771,
            longitude: -40.51592,
        });

        const { gyms } = await sut.execute({ userLatidude: 28.82561, userLongitude: 104.98472 });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({
                title: "Near Gym",
            }),
        ]);
    });
});
