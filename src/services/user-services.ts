import { hash } from "bcryptjs";

import { UserRepository } from "@/repositories/user-repository";

interface RegisterParams {
    email: string;
    name: string;
    password: string;
}

export class UserService {
    constructor(private userRepository: UserRepository) {}

    async register({ email, name, password }: RegisterParams) {
        const userWithSameEmail = await this.userRepository.findByEmail(email);

        if (userWithSameEmail) {
            throw new Error("Email already in use!");
        }

        const passwordHash = await hash(password, 6);

        await this.userRepository.create({ email, name, password_hash: passwordHash });
    }
}
