import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeUserCreateService } from "@/services/factories/make-create-user-service";

import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";

export async function createUser(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, name, password } = bodySchema.parse(req.body);

    try {
        const userService = makeUserCreateService();

        await userService.register({ email, name, password });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return res.status(409).send({ message: error.message });
        }

        throw error;
    }

    return res.status(201).send();
}
