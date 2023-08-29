import { FastifyInstance } from "fastify";

import { createUser } from "./controllers/usersController";

export async function appRoutes(app: FastifyInstance) {
    app.post("/users", createUser);
}
