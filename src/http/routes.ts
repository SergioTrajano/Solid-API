import { FastifyInstance } from "fastify";

import { authenticate } from "./controllers/authenticate-controller";
import { profile } from "./controllers/profile";
import { createUser } from "./controllers/users-controller";

export async function appRoutes(app: FastifyInstance) {
    app.post("/users", createUser);
    app.post("/sessions", authenticate);

    app.get("/me", profile);
}
