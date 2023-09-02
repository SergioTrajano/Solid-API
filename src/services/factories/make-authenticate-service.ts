import { AuthenticateService } from "../authenticate";

import { PrismaUserRepositories } from "@/repositories/prisma/prisma-users-repositories";

export function makeAuthenticateService() {
    const userRepository = new PrismaUserRepositories();
    const authenticateService = new AuthenticateService(userRepository);

    return authenticateService;
}
