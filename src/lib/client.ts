import { objectExtract } from "$lib";
import { scrapeData } from "./scraper";
import prisma from "./server/prisma"
import { hexToString } from "./util";

export const getHome = async (sourceId?: string, page?: string) => {
	const source = await prisma.source.findFirst({
		where: {
			id: sourceId,
		},
		include: {
			scraper: true
		}
	})
	if (!source) return null
	// const options = {
	// 	page,
	// }
	const obj: any = source.scraper.data;
	const scraper = objectExtract(obj);
	const data = scraper.home;
	const url = source.url
	const res = await scrapeData(url, data, source)
	// console.log(res)
	return { sourceId: source.id, categories: res }

}


export const getParent = async (sourceId: string, id: string) => {
	const source = await prisma.source.findFirst({
		where: {
			id: sourceId
		},
		include: {
			scraper: true
		}
	})
	if (!source) return null

	const obj: any = source.scraper.data;
	const scraper = objectExtract(obj);
	const data = scraper.parent;
	const url = source.url + hexToString(id)
	const res = await scrapeData(url, data, source)
	return { parent: res, sourceData: source }
}

export const getChild = async (sourceId: string, id: string) => {
	const source = await prisma.source.findFirst({
		where: {
			id: sourceId
		},
		include: {
			scraper: true
		}
	})
	if (!source) return { episode: null, sourceData: null }

	const obj: any = source.scraper.data;
	const scraper = objectExtract(obj);
	const data = scraper.episode;
	// const url = new URL(source.url ,hexToString(id))
	// const url = source.url + hexToString(id)
	const url = new URL(hexToString(id), source.url).href
	const res = await scrapeData(url, data, source)
	return { episode: res, sourceData: source }
}

export const getSearch = async (sourceId: string, keyword: string) => {
	const source: any = await prisma.source.findFirst({
		where: {
			id: sourceId
		},
		include: {
			scraper: true
		}
	})
	if (!source) return { search: null }

	const obj: any = source.scraper.data;
	const scraper = objectExtract(obj);
	const data = scraper.search;
	const url = source.url + scraper?.search?.[1]?.selector?.replace('*', keyword)
	const res = await scrapeData(url, data, source)
	return { search: res }
}
