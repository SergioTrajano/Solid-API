import { hash } from "bcryptjs";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { prisma } from "@/lib/prisma";

export async function createUser(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, name, password } = bodySchema.parse(req.body);

    const passwordHash = await hash(password, 6);

    await prisma.user.create({
        data: {
            name,
            email,
            password_hash: passwordHash,
        },
    });

    return res.status(201).send();
}
