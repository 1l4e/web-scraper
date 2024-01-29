
import { getChild } from "$lib/client";
import axios from "axios";
import type { PageServerLoad } from "./$types";
import { animetvnProxy } from "$lib/server/source/animetvn";
import { phimTm } from "$lib/server/source/phimtm";
import { dp } from "$lib/server/source/dongphim";

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
		const { dongphim, xoilac, phimtm, animetvn, post, nume } = server;
		let postData: any
		postData = {
			action: 'doo_player_ajax',
			post,
			nume,
			type: 'tv'
		}
		if (xoilac) {
			servers.push(xoilac)
		}
		const uurl = sourceData?.scraper.data?.post.selector[0];
		try {
			if (animetvn) {
				servers = await animetvnProxy(server, sourceData)
			}
			else if (phimtm) {
				servers = await phimTm(server, sourceData, url.origin)
			}
			else if (dongphim) {
				const dpServers = episode[0].server;
				servers = await dp(dpServers)
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
