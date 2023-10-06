import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(["dev", "test", "prod"]).default("dev"),
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error("Invalid env variable", _env.error.format());

    throw new Error("Invalid env variable");
}

export const env = _env.data;
