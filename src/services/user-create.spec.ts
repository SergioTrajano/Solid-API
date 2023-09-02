import { compare } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";

import { UserService } from "./user-services";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let usersRepository: InMemoryUsersRepository;
let sut: UserService;

describe("Register user service", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new UserService(usersRepository);
    });

    test("should be able to register", async () => {
        const { user } = await sut.register({
            name: "jhondoe",
            email: "jhon@gmail.com",
            password: "154646816",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    test("should hash user password upon registration", async () => {
        const { user } = await sut.register({
            name: "jhondoe",
            email: "jhon@gmail.com",
            password: "154646816",
        });

        const isPasswordHashed = await compare("154646816", user.password_hash);

        expect(isPasswordHashed).toBe(true);
    });

    test("should not be able to register user with same email twice", async () => {
        const email = "jhon@gmail.com";

        await sut.register({
            name: "jhondoe",
            email,
            password: "154646816",
        });

        expect(() =>
            sut.register({
                name: "jhondoe1",
                email,
                password: "15464681681",
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
