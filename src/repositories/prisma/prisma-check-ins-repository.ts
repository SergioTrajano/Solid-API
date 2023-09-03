import { Prisma } from "@prisma/client";
import dayjs from "dayjs";

import { prisma } from "@/lib/prisma";

import { CheckInRepository } from "../check-ins-repository";

export class PrismaCheckInRepository implements CheckInRepository {
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = await prisma.checkIn.create({ data });

        return checkIn;
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfDate = dayjs(date).startOf("date");
        const endOfDate = dayjs(date).endOf("date");

        const checkIn = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfDate.toDate(),
                    lte: endOfDate.toDate(),
                },
            },
        });

        return checkIn;
    }

    async findManyByUserId(userId: string, page: number) {
        const checkIns = await prisma.checkIn.findMany({
            where: { user_id: userId },
            take: 20,
            skip: (page - 1) * 20,
        });

        return checkIns;
    }

    async findById(id: string) {
        const checkIn = await prisma.checkIn.findUnique({ where: { id } });

        return checkIn;
    }

    async countByUserId(userId: string) {
        const count = await prisma.checkIn.count({ where: { user_id: userId } });

        return count;
    }

    async save(checkIn: Prisma.CheckInUncheckedCreateInput) {
        const updatedCheckIn = await prisma.checkIn.update({
            where: { id: checkIn.id },
            data: checkIn,
        });

        return updatedCheckIn;
    }
}
