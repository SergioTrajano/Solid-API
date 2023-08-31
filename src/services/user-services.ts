import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterParams {
    email: string;
    name: string;
    password: string;
}

export async function userRegister({ email, name, password }: RegisterParams) {
    const userWithSameEmail = await prisma.user.findUnique({ where: { email } });

    if (userWithSameEmail) {
        throw new Error("Email already in use!");
    }

    const passwordHash = await hash(password, 6);

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: passwordHash,
        },
    });
}
