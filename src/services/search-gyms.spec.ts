import { beforeEach, describe, expect, test } from "vitest";

import { InMemoryGymRepository } from "@/repositories/in-memory/in-memory-gym-repository";
import { SearchGymService } from "./search-gyms";

let gymRepository: InMemoryGymRepository;
let sut: SearchGymService;

describe("Search for gyms service", () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository();
        sut = new SearchGymService(gymRepository);
    });

    test("should be able to search for gyms", async () => {
        await gymRepository.create({
            description: "",
            title: "Gym TS",
            phoneNumber: "",
            latitude: 0,
            longitude: 0,
        });
        await gymRepository.create({
            description: "",
            title: "Gym Java",
            phoneNumber: "",
            latitude: 0,
            longitude: 0,
        });

        const { gyms } = await sut.execute({ query: "Java", page: 1 });

        expect(gyms).toHaveLength(1);
        expect(gyms).toEqual([
            expect.objectContaining({
                title: "Gym Java",
            }),
        ]);
    });

    test("should be able to fetch paginated gym search", async () => {
        for (let i = 1; i <= 22; i++) {
            await gymRepository.create({
                description: "",
                title: `Gym Java ${i}`,
                phoneNumber: "",
                latitude: 0,
                longitude: 0,
            });
        }

        const { gyms } = await sut.execute({ query: "Java", page: 2 });

        expect(gyms).toHaveLength(2);
        expect(gyms).toEqual([
            expect.objectContaining({
                title: "Gym Java 21",
            }),
            expect.objectContaining({
                title: "Gym Java 22",
            }),
        ]);
    });
});
