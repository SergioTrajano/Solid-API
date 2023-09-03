import { InMemoryCheckInRepository } from "@/repositories/in-memory/in-memory-check-in-repository";

interface GetUserMetricsServiceRequest {
    userId: string;
}

interface GetUserMetricsServiceResponse {
    checkInCount: number;
}

export class GetUserMetricsService {
    constructor(private checkInRepository: InMemoryCheckInRepository) {}

    async execute({
        userId,
    }: GetUserMetricsServiceRequest): Promise<GetUserMetricsServiceResponse> {
        const checkInCount = await this.checkInRepository.countByUserId(userId);

        return { checkInCount };
    }
}
