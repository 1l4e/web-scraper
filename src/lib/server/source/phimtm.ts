import axios from "axios";
import * as cheerio from 'cheerio'

export async function phimTm(server: any, source: any, url: any) {
    const servers = []
    const phimtm = server.phimtm;
    const inputString = phimtm.trim().split(';');

    const episodeId = inputString[1].match(/\d+/)[0];
    const filmId = inputString[2].match(/\d+/)[0];
    if (!episodeId || !filmId) {
        return {}
    }
    const postData = {
        NextEpisode: "1",
        EpisodeID: episodeId,
        filmID: filmId,
        playTech: "auto"
    }
    try {
        const res = await axios.post(url + "/api/proxy", {
            url: source?.scraper?.data?.post?.selector[0],
            postData,
            referer: source.url
        })
        if (res.status !== 200) {
            return {}
        }
        const embedData = res.data
        const $ = cheerio.load(embedData)
        const server = $('iframe').attr('src')
        servers.push(server)
        return servers
    } catch (error) {
        return servers
    }

}
