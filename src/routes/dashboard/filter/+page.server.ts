import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { findManyFilter } from "$lib/server/model/filter";


export const load: PageServerLoad = async ({ params, locals }) => {

	const session = await locals.auth.validate();
	if (!session) throw redirect(302, "/login");

	if (session.user.role !== "ADMIN") throw redirect(302, "/");
	const filters = await findManyFilter(true);
	return {
		userId: session.user.userId,
		email: session.user.email,
		filters
	}
}
