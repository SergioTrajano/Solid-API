import { UserService } from "../create-user";

import { PrismaUserRepositories } from "@/repositories/prisma/prisma-users-repositories";

export function makeUserCreateService() {
    const userRepository = new PrismaUserRepositories();

    const service = new UserService(userRepository);

    return service;
}
