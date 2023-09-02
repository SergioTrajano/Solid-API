import { UserRepository } from "@/repositories/user-repository";
import { User } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface GetUserProfileServiceRequest {
    userId: string;
}

interface GetUserProfileServiceResponse {
    user: User;
}

export class GetUserProfile {
    constructor(private userRepository: UserRepository) {}

    async execute({
        userId,
    }: GetUserProfileServiceRequest): Promise<GetUserProfileServiceResponse> {
        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new ResourceNotFoundError();
        }

        return { user };
    }
}
