import { FastifyInstance } from "fastify";

import { verifyJWT } from "@/middlewares/verify-jwt";

import { authenticate } from "./authenticate-controller";
import { profile } from "./profile";
import { createUser } from "./users-controller";

export async function usersRoutes(app: FastifyInstance) {
    app.post("/users", createUser);
    app.post("/sessions", authenticate);

    app.get("/me", { onRequest: verifyJWT }, profile);
}
