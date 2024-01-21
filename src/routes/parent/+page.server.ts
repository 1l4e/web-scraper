import { getParent } from "$lib/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const searchParams = url.searchParams
	const id = searchParams.get('id');
	const source = searchParams.get('source');
	if (!source || !id) {
		return null
	}
	const parent = await getParent(source, id)
	return {
		sourceId:source,
		id,
		parent
	}

}
