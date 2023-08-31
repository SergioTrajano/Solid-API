import fastify from "fastify";

import { ZodError } from "zod";
import { env } from "./env";
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, res) => {
    if (error instanceof ZodError) {
        return res.status(400).send({ message: "Validation error", issues: error.format() });
    }

    if (env.NODE_ENV !== "prod") {
        console.error(error);
    }

    return res.status(500).send({ message: "Internal Server Error" });
});
