import { CheckIn, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";

import { CheckInRepository } from "../check-ins-repository";

export class InMemoryCheckInRepository implements CheckInRepository {
    public checkIns: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            gym_id: data.gym_id,
            user_id: data.user_id,
            validated_at: data.validated_at ? new Date() : null,
            created_at: new Date(),
        };

        this.checkIns.push(checkIn);

        return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const checkInOnSameDate = this.checkIns.find((checkIn) => checkIn.user_id === userId);

        if (!checkInOnSameDate) {
            return null;
        }

        return checkInOnSameDate;
    }
}
