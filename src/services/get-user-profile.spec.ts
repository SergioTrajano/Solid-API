import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { GetUserProfile } from "./get-user-profile";

let usersRepository: InMemoryUsersRepository;
let sut: GetUserProfile;

describe("Get user profile service", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new GetUserProfile(usersRepository);
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
});
