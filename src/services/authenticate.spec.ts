import { hash } from "bcryptjs";
import { beforeEach, describe, expect, test } from "vitest";

import { AuthenticateService } from "./authenticate";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let usersRepository: InMemoryUsersRepository;
let sut: AuthenticateService;

describe("Authenticate service", () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository();
        sut = new AuthenticateService(usersRepository);
    });

    test("should be able to authenticate", async () => {
        const hashedPassword = await hash("12345678", 6);

        await usersRepository.create({
            email: "jhondoe@gmail.com",
            name: "jhondoe",
            password_hash: hashedPassword,
        });

        const { user } = await sut.execute({
            email: "jhondoe@gmail.com",
            password: "12345678",
        });

        expect(user.id).toEqual(expect.any(String));
    });

    test("should not be able to authenticate with wrong email", async () => {
        expect(() =>
            sut.execute({
                email: "jhondoe@gmail.com",
                password: "12345678",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });

    test("should not be able to authenticate with wrong password", async () => {
        const hashedPassword = await hash("12345678", 6);

        await usersRepository.create({
            email: "jhondoe@gmail.com",
            name: "jhondoe",
            password_hash: hashedPassword,
        });

        expect(() =>
            sut.execute({
                email: "jhondoe@gmail.com",
                password: "wrongPassword",
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError);
    });
});
