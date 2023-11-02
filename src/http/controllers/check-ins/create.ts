import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeCheckInService } from "@/services/factories/make-check-in-service";

export async function create(req: FastifyRequest, res: FastifyReply) {
    const createCheckInBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90;
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180;
        }),
    });
    const createCheckInsParamsSchema = z.object({
        gymId: z.string().uuid(),
    });

    const { latitude, longitude } = createCheckInBodySchema.parse(req.body);
    const { gymId } = createCheckInsParamsSchema.parse(req.params);

    const checkInService = makeCheckInService();

    await checkInService.execute({
        gymId,
        userLatitude: latitude,
        userLongitude: longitude,
        userId: req.user.sub,
    });

    return res.status(201).send();
}
