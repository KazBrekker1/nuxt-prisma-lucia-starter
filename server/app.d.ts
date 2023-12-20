/// <reference types="lucia" />
declare namespace Lucia {
    type Auth = import("./utils/prisma").Auth;
    type DatabaseUserAttributes = {
        username: string;
        email: string;
    };
    type DatabaseSessionAttributes = {};
}