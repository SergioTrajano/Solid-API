import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository";
import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";

import { CheckInService } from "../check-in";

export function makeCheckInService() {
    const checkInRepository = new PrismaCheckInRepository();
    const gymRepository = new PrismaGymRepository();

    const service = new CheckInService(checkInRepository, gymRepository);

    return service;
}
