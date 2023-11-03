import { CheckIn } from "@prisma/client";

import { CheckInRepository } from "@/repositories/check-ins-repository";
import dayjs from "dayjs";
import { LateCheckInValidationError } from "./errors/late-check-in-validation-error";
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

        const differenceInMinutesFromCheckInCreation = dayjs(new Date()).diff(
            checkIn.created_at,
            "minutes"
        );

        const MAX_DIFFERENCE_IN_MINUTES_BETWEEN_CHECK_IN_CREATION_AND_VALIDATION_TIME = 20;

        if (
            differenceInMinutesFromCheckInCreation >
            MAX_DIFFERENCE_IN_MINUTES_BETWEEN_CHECK_IN_CREATION_AND_VALIDATION_TIME
        ) {
            throw new LateCheckInValidationError();
        }

        checkIn.validated_at = new Date();

        await this.checkInRepository.save(checkIn);

        return { checkIn };
    }
}
