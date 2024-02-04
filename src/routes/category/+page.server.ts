import { getCategory } from "$lib/client";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";



export const load: PageServerLoad = async ({ url }) => {
	const searchParams = url.searchParams
	let sourceId = searchParams.get('source')?.toString()
	const id = searchParams.get('id')?.toString()
	let page = searchParams.get('page')?.toString() || "1"
	if (!sourceId || !id) {
		return {}
	}
	// const serverUrl = url.origin + url.pathname + '/' + id + '?source=' + sourceId
	const res: any = await getCategory(sourceId, id, page)
	if (!res || res === null) {
		error(404, 'Internal Error')
	}
	const { category, sourceData } = res

	const paginations = category?.[1]?.selector || [];
	let min = Infinity;
	let max = 0;
	if (paginations.length > 0) {
		paginations.forEach((pagination: any) => {
			if (pagination?.title) {
				min >= +pagination.title && (min = +pagination.title);
				max <= +pagination.title && (max = +pagination.title);
			}
		});
	}
	const params = new URLSearchParams();
	id && params.append('id', id);
	sourceId && params.append('source', sourceId);
	if (parseInt(page) >= max) {
		page = (max - 1).toString()
	}
	const firstPage = new URL(url.pathname + '?' + params.toString(), url.origin).href
	const lastPage = new URL(url.pathname + '?' + params.toString(), url.origin).href + '?page=' + max
	const prevPage = new URL(url.pathname + '?' + params.toString(), url.origin).href + '?page=' + (parseInt(page) - 1)
	page && params.append('page', parseInt(page) + 1 + "");
	let nextPage = new URL(url.pathname + '?' + params.toString(), url.origin).href
	if (max === 0) {
		nextPage = ''
	}
	return {
		category,
		sourceData,
		nextPage,
		page,
		min,
		max,
		firstPage,
		lastPage,
		prevPage
	}
}
