import { Gym, Prisma } from "@prisma/client";

import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";
import { GymRepository } from "../gym-repository";

export class InMemoryGymRepository implements GymRepository {
    public gyms: Gym[] = [];

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            description: data.description ?? null,
            phoneNumber: data.phoneNumber ?? "",
            title: data.title,
            latitude: new Decimal(String(data.latitude)),
            longitude: new Decimal(String(data.longitude)),
        };

        this.gyms.push(gym);

        return gym;
    }

    async findById(id: string) {
        const gym = this.gyms.find((gym) => gym.id === id);

        if (!gym) {
            return null;
        }

        return gym;
    }
}
