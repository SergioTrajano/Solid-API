import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";

import { FetchNearbyGymsService } from "../fetch-nearby-gyms";

export function makeFetchNearbyGymsService() {
    const gymRepository = new PrismaGymRepository();

    const service = new FetchNearbyGymsService(gymRepository);

    return service;
}
