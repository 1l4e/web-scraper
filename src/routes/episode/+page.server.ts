
import { getChild } from "$lib/client";
import axios from "axios";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url }) => {
	const searchParams = url.searchParams
	const id = searchParams.get('id');
	const source = searchParams.get('source');
	if (!source || !id) {
		return null
	}
	const { episode, sourceData }:any = await getChild(source, id)
	let servers: any = [];
	for (const server of episode[0].server) {
		const { post, nume } = server;
		if (!post || !nume) {
			continue;
		}
		const postData = {
			action: 'doo_player_ajax',
			post,
			nume,
			type: 'tv'
		};
		const uurl = sourceData?.scraper.data?.post.selector[0];
		const res = await axios.post(url.origin+ '/api/proxy', { url:uurl, postData, referer:sourceData.url });
		if (res.status !== 200) {
			continue;
		}
		const embedData = res.data;
		const { embed_url, iframe } = embedData;
		servers.push(embed_url)
	}

	return {
		sourceId: source,
		id,
		episode,
		servers
	}

}
