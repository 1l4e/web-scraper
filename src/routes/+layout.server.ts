import { findManySources } from "$lib/server/model";

export const load: any = async ({ locals }: any) => {
	const session = await locals.auth.validate();
	const sources = await findManySources();
	if (!session) return {
		userId: null,
		email: null,
		sources,
	};
	return {
		userId: session.user.userId,
		email: session.user.email,
		role: session.user.role,
		sources
	};
};
