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
		console.log(e);
		// check for unique constraint error in user table
		// if (e instanceof SqliteError && e.code === "SQLITE_CONSTRAINT_UNIQUE") {
		// 	throw createError({
		// 		message: "email already taken",
		// 		statusCode: 400
		// 	});
		// }
		throw createError({
			message: "An unknown error occurred",
			statusCode: 500
		});
	}
});