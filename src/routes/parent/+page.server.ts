import { getParent } from "$lib/client";
import axios from "axios";
import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ url }) => {
	const searchParams = url.searchParams
	const id = searchParams.get('id');
	const source = searchParams.get('source');
	let server = searchParams.get('server') ?? 0;
	if (!source || !id) {
		return null
	}
	const serverUrl = url.origin + url.pathname + '/' + id + '?source=' + source;
	try {
		const res: any = await getParent(source, id)
		if (!res || res === null) {
			error(404, 'Not found');
		}
		const { parent, sourceData } = res
		let servers: any = [];
		if (parent && parent.length > 1 && parent[1]?.server) {
			const { post, nume } = parent[1].server[server];
			if (!post || !nume) {
				return
			}
			const postData = {
				action: 'doo_player_ajax',
				post,
				nume,
				type: 'tv'
			};
			const uurl = sourceData?.scraper.data?.post.selector[0];
			const res = await axios.post(url.origin + '/api/proxy', { url: uurl, postData, referer: sourceData.url });
			if (res.status !== 200) {
				return;
			}
			const embedData = res.data;
			const { embed_url } = embedData;
			servers.push(embed_url)
		}
		return {
			sourceId: source,
			id,
			parent,
			servers,
			serverUrl,
			revert: false,
			title: sourceData?.name?.toUpperCase() + " - " + parent[0]?.title
		}
	} catch (e: any) {
		return error(404, 'Not found')
	}

}
