import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

import { PrismaUserRepositories } from "@/repositories/prisma-users-repositories";

interface RegisterParams {
    email: string;
    name: string;
    password: string;
}

const prismaUserRepositories = new PrismaUserRepositories();

export async function userRegister({ email, name, password }: RegisterParams) {
    const userWithSameEmail = await prisma.user.findUnique({ where: { email } });

    if (userWithSameEmail) {
        throw new Error("Email already in use!");
    }

    const passwordHash = await hash(password, 6);

    await prismaUserRepositories.create({ email, name, password_hash: passwordHash });
}
