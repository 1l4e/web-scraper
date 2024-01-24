import { redirect } from "@sveltejs/kit";

import type { PageServerLoad } from "./$types";
import { findManySources } from "$lib/server/model";

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");
	if (session.user.role !== "ADMIN") throw redirect(302, "/");
	const sources = await findManySources();
	return {
		userId: session.user.userId,
		email: session.user.email,
		sources
	};
};


