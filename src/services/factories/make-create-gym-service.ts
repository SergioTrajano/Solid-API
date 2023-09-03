import { PrismaGymRepository } from "@/repositories/prisma/prisma-gyms-repository";

import { CreateGymService } from "../create-gym";

export function makeCreateGymsService() {
    const gymRepository = new PrismaGymRepository();

    const service = new CreateGymService(gymRepository);

    return service;
}
