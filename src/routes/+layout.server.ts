import { findManySources } from "$lib/server/model";
import { findOneFilter } from "$lib/server/model/filter";

export const load: any = async ({ locals }: any) => {
	const session = await locals.auth.validate();
	const sources = await findManySources(true);
	const filter = await findOneFilter("movie");
	if (!session) return {
		userId: null,
		email: null,
		sources,
		filter
	};
	return {
		userId: session.user.userId,
		email: session.user.email,
		role: session.user.role,
		sources,
		filter
	};
};
