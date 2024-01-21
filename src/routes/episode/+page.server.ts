
import { getChild } from "$lib/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const searchParams = url.searchParams
	const id = searchParams.get('id');
	const source = searchParams.get('source');
	if (!source || !id) {
		return null
	}
	const episode = await getChild(source, id)
	return {
		sourceId: source,
		id,
		episode
	}

}
