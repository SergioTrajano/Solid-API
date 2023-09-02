import { CheckIn } from "@prisma/client";

import { CheckInRepository } from "@/repositories/check-ins-repository";
import { GymRepository } from "@/repositories/gym-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface CheckInServiceRequest {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
}

interface CheckInServiceResponse {
    checkIn: CheckIn;
}

export class CheckInService {
    constructor(
        private checkInRepository: CheckInRepository,
        private gymRepository: GymRepository
    ) {}

    async execute({
        gymId,
        userId,
        userLatitude,
        userLongitude,
    }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
        const gym = await this.gymRepository.findById(gymId);

        if (!gym) {
            throw new ResourceNotFoundError();
        }

        const distanceBetweenUserAndGym = getDistanceBetweenCoordinates(
            { latitude: userLatitude, longitude: userLongitude },
            { latitude: Number(gym?.latitude), longitude: Number(gym?.longitude) }
        );
        const MAX_DISTANCE_IN_KILOMETERS = 0.1;

        if (distanceBetweenUserAndGym > MAX_DISTANCE_IN_KILOMETERS) {
            throw new Error();
        }

        const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
            userId,
            new Date()
        );

        if (checkInOnSameDate) {
            throw new Error();
        }

        const checkIn = await this.checkInRepository.create({ gym_id: gymId, user_id: userId });

        return { checkIn };
    }
}
