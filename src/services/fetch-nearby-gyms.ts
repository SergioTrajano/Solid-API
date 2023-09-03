import { Gym } from "@prisma/client";

import { GymRepository } from "@/repositories/gym-repository";

interface FetchNearbyGymsServiceRequest {
    userLatidude: number;
    userLongitude: number;
}

interface FetchNearbyGymsServiceResponse {
    gyms: Gym[];
}

export class FetchNearbyGymsService {
    constructor(private gymRepository: GymRepository) {}

    async execute({
        userLatidude,
        userLongitude,
    }: FetchNearbyGymsServiceRequest): Promise<FetchNearbyGymsServiceResponse> {
        const gyms = await this.gymRepository.findManyNearby({
            latitude: userLatidude,
            longitude: userLongitude,
        });

        return { gyms };
    }
}
