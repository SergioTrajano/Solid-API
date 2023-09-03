import { CheckInRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsServiceRequest {
    userId: string;
}

interface GetUserMetricsServiceResponse {
    checkInCount: number;
}

export class GetUserMetricsService {
    constructor(private checkInRepository: CheckInRepository) {}

    async execute({
        userId,
    }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
        const checkInCount = await this.checkInRepository.countByUserId(userId);

        return { checkInCount };
    }
}
