import { hash } from "bcryptjs";
import { describe, expect, test } from "vitest";

import { AuthenticateService } from "./authenticate";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

describe("Authenticate service", () => {
    test("should be able to authenticate", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const authenticateService = new AuthenticateService(usersRepository);

        const hashedPassword = await hash("12345678", 6);

        await usersRepository.create({
            email: "jhondoe@gmail.com",
            name: "jhondoe",
            password_hash: hashedPassword,
        });

        const { user } = await authenticateService.execute({
            email: "jhondoe@gmail.com",
            password: "12345678",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    test("should not be able to authenticate with wrong email", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const authenticateService = new AuthenticateService(usersRepository);

        expect(() =>
            authenticateService.execute({
                email: "jhondoe@gmail.com",
                password: "12345678",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    test("should not be able to authenticate with wrong password", async () => {
        const usersRepository = new InMemoryUsersRepository();
        const authenticateService = new AuthenticateService(usersRepository);

        const hashedPassword = await hash("12345678", 6);

        await usersRepository.create({
            email: "jhondoe@gmail.com",
            name: "jhondoe",
            password_hash: hashedPassword,
        });

        expect(() =>
            authenticateService.execute({
                email: "jhondoe@gmail.com",
                password: "wrongPassword",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
