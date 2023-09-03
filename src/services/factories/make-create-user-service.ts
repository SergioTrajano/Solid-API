import { UserService } from "../create-user";

import { PrismaUserRepositories } from "@/repositories/prisma/prisma-users-repositories";

export function makeUserCreateService() {
    const userRepository = new PrismaUserRepositories();
    const userService = new UserService(userRepository);

    return userService;
}
