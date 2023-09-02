import { Gym } from "@prisma/client";

import { GymRepository } from "@/repositories/gym-repository";

interface CreateGymServiceRequest {
    title: string;
    description: string | null;
    phoneNumber: string;
    latitude: number;
    longitude: number;
}

interface CreateGymServiceResponse {
    gym: Gym;
}

export class CreateGymService {
    constructor(private gymRepository: GymRepository) {}

    async register({
        description,
        title,
        phoneNumber,
        latitude,
        longitude,
    }: CreateGymServiceRequest): Promise<CreateGymServiceResponse> {
        const gym = await this.gymRepository.create({
            latitude,
            longitude,
            phoneNumber,
            title,
            description,
        });
        return { gym };
    }
}
