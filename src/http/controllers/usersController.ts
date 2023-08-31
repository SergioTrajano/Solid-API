import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { PrismaUserRepositories } from "@/repositories/prisma/prisma-users-repositories";
import { UserService } from "@/services/user-services";

export async function createUser(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, name, password } = bodySchema.parse(req.body);

    try {
        const userRepository = new PrismaUserRepositories();
        const userService = new UserService(userRepository);

        await userService.register({ email, name, password });
    } catch (error) {
        return res.status(409).send();
    }
    return res.status(201).send();
}
