import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository";

import { GetUserMetricsService } from "../get-user-metrics";

export function makeGetUserMetricsService() {
    const checkInRepository = new PrismaCheckInRepository();

    const service = new GetUserMetricsService(checkInRepository);

    return service;
}
