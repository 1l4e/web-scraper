import { auth } from "$lib/server/lucia";
import { fail, redirect } from "@sveltejs/kit";

import type { PageServerLoad, Actions } from "./$types";
import { SECRET_REFERER } from "$env/static/private";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) throw redirect(302, "/");
    return {};
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const formData = await request.formData();
        const username = formData.get("username");
        const password = formData.get("password");
        const referer = formData.get("referer")
        if (referer !== SECRET_REFERER) {
            return fail(400, {
                message: "Invalid referrer"
            });
        }
        // basic check
        if (
            typeof username !== "string" ||
            username.length < 4 ||
            username.length > 31
        ) {
            return fail(400, {
                message: "Invalid username"
            });
        }
        if (
            typeof password !== "string" ||
            password.length < 6 ||
            password.length > 255
        ) {
            return fail(400, {
                message: "Invalid password"
            });
        }
        try {
            const user = await auth.createUser({
                key: {
                    providerId: "username", // auth method
                    providerUserId: username.toLowerCase(), // unique id when using "username" auth method
                    password // hashed by Lucia
                },
                attributes: {
                    email: username,
                    role: "USER"
                }
            });
            const session = await auth.createSession({
                userId: user.userId,
                attributes: {}
            });
            locals.auth.setSession(session); // set session cookie
        } catch (e) {
            // this part depends on the database you're using
            // check for unique constraint error in user table
            // if (
            // 	e instanceof SomeDatabaseError &&
            // 	e.message === USER_TABLE_UNIQUE_CONSTRAINT_ERROR
            // ) {
            // 	return fail(400, {
            // 		message: "Username already taken"
            // 	});
            // }
            return fail(500, {
                message: "An unknown error occurred"
            });
        }
        // redirect to
        // make sure you don't throw inside a try/catch block!
        throw redirect(302, "/");
    }
};
