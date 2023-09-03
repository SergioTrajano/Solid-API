import { PrismaUserRepositories } from "@/repositories/prisma/prisma-users-repositories";
import { GetUserProfileService } from "../get-user-profile";

export function makeGetUserProfileService() {
    const userRepository = new PrismaUserRepositories();

    const service = new GetUserProfileService(userRepository);

    return service;
}
