
import { getChild } from "$lib/client";
import axios from "axios";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ url, params }) => {
	const searchParams = url.searchParams
	const episodeId = params.episodeId;
	const source = searchParams.get('source');
	if (!source || !episodeId) {
		return null
	}
	const { episode, sourceData }: any = await getChild(source, episodeId)

	let servers: any = [];

	const serverUrl = url.origin + url.pathname + '?source=' + source;
	if (episode[0]?.server && episode[0].server.length > 0) {
		const server = episode[0].server[0];
		const { post, nume } = server;
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
			return
		}
		const embedData = res.data;
		const { embed_url, iframe } = embedData;
		servers.push(embed_url)
	}

	return {
		sourceId: source,
		id: episodeId,
		episode,
		servers,
		serverUrl,
	}

}
