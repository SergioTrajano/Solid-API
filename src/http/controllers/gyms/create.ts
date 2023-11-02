import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCreateGymsService } from "@/services/factories/make-create-gym-service";

export async function create(req: FastifyRequest, res: FastifyReply) {
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().email().nullable(),
        phone: z.string(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180;
        }),
    });

    const { title, description, latitude, longitude, phone } = createGymBodySchema.parse(req.body);

    const createGymService = makeCreateGymsService();

    await createGymService.register({
        title,
        description,
        latitude,
        longitude,
        phoneNumber: phone,
    });

    return res.status(201).send();
}
