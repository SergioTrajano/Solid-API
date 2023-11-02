import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeSearchGymsService } from "@/services/factories/make-search-gyms-service";

export async function search(req: FastifyRequest, res: FastifyReply) {
    const searchGymQuerySchema = z.object({
        query: z.string(),
        page: z.coerce.number().min(1).default(1),
    });

    const { query, page } = searchGymQuerySchema.parse(req.query);

    const searchGymService = makeSearchGymsService();

    const { gyms } = await searchGymService.execute({
        page,
        query,
    });

    return res.status(201).send({
        gyms,
    });
}
