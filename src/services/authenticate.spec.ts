import { describe, expect, test } from "vitest";

import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";
import { hash } from "bcryptjs";
import { AuthenticateService } from "./authenticate";

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
});
