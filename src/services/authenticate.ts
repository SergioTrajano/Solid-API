import { User } from "@prisma/client";
import { compare } from "bcryptjs";

import { UserRepository } from "@/repositories/user-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateServiceRequest {
    email: string;
    password: string;
}

interface AuthenticateServiceResponse {
    user: User;
}

export class AuthenticateService {
    constructor(private userRepository: UserRepository) {}

    async execute({
        email,
        password,
    }: AuthenticateServiceRequest): Promise<AuthenticateServiceResponse> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new InvalidCredentialsError();
        }

        const doesPasswordMatches = await compare(password, user.password_hash);

        if (!doesPasswordMatches) {
            throw new InvalidCredentialsError();
        }

        return { user };
    }
}
