import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default defineEventHandler(async (event) => {
	const { email, password, username } = await readBody<{
		email: string;
		username: string;
		password: string;
	}>(event);
	try {
		const user = await auth.createUser({
			key: {
				providerId: "email",
				providerUserId: email.toLowerCase(),
				password
			},
			attributes: {
				email,
				username
			}
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		const authRequest = auth.handleRequest(event);
		authRequest.setSession(session);
		return sendRedirect(event, "/"); // redirect to profile page
	} catch (e) {
		// check for unique constraint error in user table
		if (e instanceof PrismaClientKnownRequestError && e.code === "P2002") {
			throw createError({
				message: "email already taken",
				statusCode: 400
			});
		}
		console.error(e);
		throw createError({
			message: "An unknown error occurred",
			statusCode: 500
		});
	}
});