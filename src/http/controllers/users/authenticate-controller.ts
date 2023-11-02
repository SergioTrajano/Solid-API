import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeAuthenticateService } from "@/services/factories/make-authenticate-service";

import { InvalidCredentialsError } from "@/services/errors/invalid-credentials-error";

export async function authenticate(req: FastifyRequest, res: FastifyReply) {
    const bodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    try {
        const authenticateService = makeAuthenticateService();

        const { user } = await authenticateService.execute({ email, password });

        const token = await res.jwtSign(
            {},
            {
                sign: {
                    sub: user.id,
                },
            }
        );

        return res.status(200).send({ token });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return res.status(400).send({ message: error.message });
        }

        throw error;
    }
}
