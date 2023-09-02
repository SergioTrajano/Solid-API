import { CheckIn } from "@prisma/client";

import { CheckInRepository } from "@/repositories/check-ins-repository";

interface FetchUserCheckInsHistoryServiceRequest {
    userId: string;
    page: number;
}

interface FetchUserCheckInsHistoryServiceResponse {
    checkIns: CheckIn[];
}

export class FetchUserCheckInsHistoryService {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({
        userId,
        page,
    }: FetchUserCheckInsHistoryServiceRequest): Promise<FetchUserCheckInsHistoryServiceResponse> {
        const checkIns = await this.checkInRepository.findManyByUserId(userId, page);

        return { checkIns };
    }
}
