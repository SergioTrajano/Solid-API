import { compare } from "bcryptjs";
import { describe, expect, test } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";
import { UserService } from "./user-services";

describe("Register user service", () => {
    test("should be able to register", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const userService = new UserService(usersRepository);

        const { user } = await userService.register({
            name: "jhondoe",
            email: "jhon@gmail.com",
            password: "154646816",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    test("should hash user password upon registration", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const userService = new UserService(usersRepository);

        const { user } = await userService.register({
            name: "jhondoe",
            email: "jhon@gmail.com",
            password: "154646816",
        });

        const isPasswordHashed = await compare("154646816", user.password_hash);

        expect(isPasswordHashed).toBe(true);
    });

    test("should not be able to register user with same email twice", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const userService = new UserService(usersRepository);

        const email = "jhon@gmail.com";

        await userService.register({
            name: "jhondoe",
            email,
            password: "154646816",
        });

        expect(() =>
            userService.register({
                name: "jhondoe1",
                email,
                password: "15464681681",
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError);
    });
});
