import fastifyJwt from "@fastify/jwt";
import fastify from "fastify";
import { ZodError } from "zod";

import { env } from "./env";

import { gymsRoutes } from "./http/controllers/gyms/routes";
import { usersRoutes } from "./http/controllers/users/routes";

export const app = fastify();

app.register(usersRoutes);
app.register(gymsRoutes);

app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
});

app.setErrorHandler((error, _, res) => {
    if (error instanceof ZodError) {
        return res.status(400).send({ message: "Validation error", issues: error.format() });
    }

    if (env.NODE_ENV !== "prod") {
        console.error(error);
    }

    return res.status(500).send({ message: "Internal Server Error" });
});
