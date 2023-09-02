import { CheckIn } from "@prisma/client";

import { CheckInRepository } from "@/repositories/check-ins-repository";

interface CheckInServiceRequest {
    userId: string;
    gymId: string;
}

interface CheckInServiceResponse {
    checkIn: CheckIn;
}

export class CheckInService {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({ gymId, userId }: CheckInServiceRequest): Promise<CheckInServiceResponse> {
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
