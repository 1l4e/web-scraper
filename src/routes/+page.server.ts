
import { getHome } from "$lib/client";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const searchParams = url.searchParams
	let sourceId = searchParams.get('source')?.toString()
	let page = searchParams.get('page')?.toString()
	try {
		const res = await getHome(sourceId, page);
		if (!res || res === null) {
			error(404, 'Not found');
		}
		return {
			categories: res?.categories,
			sourceId: res?.sourceId,
			categoryData: res?.categoryData
		};
	} catch (e: any) {
		error(404, 'Not found');
	}
};
