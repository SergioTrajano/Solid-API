import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { GetUserProfileService } from "./get-user-profile";

import { ResourceNotFoundError } from "./errors/resource-not-found";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfileService;

describe("Get user profile service", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfileService(usersRepository);
    });

    test("should be able to get user profile", async () => {
        const hashedPassword = await hash("12345678", 6);

        const { id } = await usersRepository.create({
            email: "jhondoe@gmail.com",
            name: "jhondoe",
            password_hash: hashedPassword,
        });

        const { user } = await sut.execute({
            userId: id,
        });

        expect(user.id).toEqual(id);
    });

    test("should be able to get user profile with wrong id", async () => {
        await expect(() =>
            sut.execute({
                userId: "no-existing-id",
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError);
    });
});
