
import { getChild } from "$lib/client";
import axios from "axios";
import type { PageServerLoad } from "./$types";
import cookie from "cookie";
import { animetvnProxy } from "$lib/server/source/animetvn";

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
		const { animetvn, post, nume } = server;
		let postData: any
		postData = {
			action: 'doo_player_ajax',
			post,
			nume,
			type: 'tv'
		}
		const uurl = sourceData?.scraper.data?.post.selector[0];
		try {
			if (animetvn) {
				servers = await animetvnProxy(server, sourceData)
			}
			else {
				const res = await axios.post(url.origin + '/api/proxy', { url: uurl, postData, referer: sourceData.url });
				if (res.status !== 200) {
					return
				}
				const embedData = res.data;
				const { embed_url } = embedData;
				servers.push(embed_url)
			}
		} catch (error: any) {
			// Control cookie if fail then get another cookie and csrf
			console.log(error.message)
			servers.push({})
		}
	}

	return {
		sourceId: source,
		id: episodeId,
		episode,
		servers,
		serverUrl,
	}

}
