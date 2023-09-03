import { CheckIn } from "@prisma/client";

import { CheckInRepository } from "@/repositories/check-ins-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found";

interface ValidateCheckInServiceRequest {
    checkInId: string;
}

interface ValidateCheckInServiceResponse {
    checkIn: CheckIn;
}

export class ValidateCheckInService {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({
        checkInId,
    }: ValidateCheckInServiceRequest): Promise<ValidateCheckInServiceResponse> {
        const checkIn = await this.checkInRepository.findById(checkInId);

        if (!checkIn) {
            throw new ResourceNotFoundError();
        }

        checkIn.validated_at = new Date();

        this.checkInRepository.save(checkIn);

        return { checkIn };
    }
}
