
import { lucia } from "lucia";
import { client } from "./prisma"
import { prisma } from "@lucia-auth/adapter-prisma";
import { h3 } from "lucia/middleware";

export const auth = lucia({
    env: process.dev ? "DEV" : "PROD", // "PROD" if deployed to HTTPS
    middleware: h3(),
    adapter: prisma(client),
    getUserAttributes: (data) => {
        return {
            username: data.username,
            email: data.email
        };
    }

});

export type Auth = typeof auth;