import { Gym, Prisma } from "@prisma/client";

import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";
import { FindManyNearbyParams, GymRepository } from "../gym-repository";

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

    async searchMany(query: string, page: number) {
        const gyms = this.gyms.filter((gym) => gym.title.includes(query));

        const paginatedGyms = gyms.slice((page - 1) * 20, page * 20);

        return paginatedGyms;
    }

    async findManyNearby(params: FindManyNearbyParams) {
        const gyms = this.gyms.filter((gym) => {
            const distance = getDistanceBetweenCoordinates(
                { latitude: params.latitude, longitude: params.longitude },
                { latitude: Number(gym.latitude), longitude: Number(gym.longitude) }
            );

            const MAX_DISTANCE_IN_KILOMETERS = 10;

            return distance < MAX_DISTANCE_IN_KILOMETERS;
        });

        return gyms;
    }
}
