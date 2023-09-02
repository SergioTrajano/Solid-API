import { hash } from "bcryptjs";

import { UserRepository } from "@/repositories/user-repository";
import { UserAlreadyExistsError } from "@/services/errors/user-already-exists-error";
import { User } from "@prisma/client";

interface RegisterParams {
    email: string;
    name: string;
    password: string;
}

interface RegisterResponse {
    user: User;
}

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async register({ email, name, password }: RegisterParams): Promise<RegisterResponse> {
        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new UserAlreadyExistsError();
        }

        const passwordHash = await hash(password, 6);

        const user = await this.userRepository.create({ email, name, password_hash: passwordHash });

        return { user };
    }
}
