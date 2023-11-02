import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

import { makeValidateCheckInService } from "@/services/factories/make-validate-check-in-service";

export async function validate(req: FastifyRequest, res: FastifyReply) {
    const validateCheckInParamsSchema = z.object({
        checkInId: z.string().uuid(),
    });

    const { checkInId } = validateCheckInParamsSchema.parse(req.params);

    const validateCheckInService = makeValidateCheckInService();

    const { checkIn } = await validateCheckInService.execute({
        checkInId,
    });

    return res.status(200).send({
        checkIn,
    });
}
