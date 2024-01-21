
import { getHome } from "$lib/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const searchParams = url.searchParams
	let sourceId = searchParams.get('source')?.toString()
	let page = searchParams.get('page')?.toString()
	const res = await getHome(sourceId, page);
	return {
		categories: res?.categories,
		sourceId: res?.sourceId
	};
};
