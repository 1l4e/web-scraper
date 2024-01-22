import type { PageServerLoad } from "./$types";
import { getSearch } from "$lib/client";


export const load: PageServerLoad = async ({ url }) => {
	const searchParams = url.searchParams
	const keyword = searchParams.get('keyword')
	const source = searchParams.get('source');
	if (!source || !keyword) {
		return {
			sourceId: source,
			keyword,
			search: undefined
		}
	}
	const { search } = await getSearch(source, keyword)
	return {
		sourceId: source,
		keyword,
		search,
	}
}
