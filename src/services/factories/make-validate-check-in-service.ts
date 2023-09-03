import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository";

import { ValidateCheckInService } from "../validate-check-in";

export function makeValidateCheckInService() {
    const checkInRepository = new PrismaCheckInRepository();

    const service = new ValidateCheckInService(checkInRepository);

    return service;
}
