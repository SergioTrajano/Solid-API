import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";

import { SearchGymService } from "../search-gyms";

export function makeSearchGymsService() {
    const gymRepository = new PrismaGymRepository();

    const service = new SearchGymService(gymRepository);

    return service;
}
