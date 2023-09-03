import { PrismaCheckInRepository } from "@/repositories/prisma/prisma-check-ins-repository";

import { FetchUserCheckInsHistoryService } from "../fetch-user-check-ins-history";

export function makeFetchUserCheckInsHistoryService() {
    const checkInRepository = new PrismaCheckInRepository();

    const service = new FetchUserCheckInsHistoryService(checkInRepository);

    return service;
}
