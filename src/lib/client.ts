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
	const res = await scrapeData(url, data)
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

	// const options = {
	// 	path: hexToString(id)
	// }

	const obj: any = source.scraper.data;
	const scraper = objectExtract(obj);
	const data = scraper.parent;
	const url = source.url + hexToString(id)
	const res = await scrapeData(url, data)
	return res
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
	if (!source) return null
	// const options = {
	// 	path: hexToString(id)
	// }
	
	const obj: any = source.scraper.data;
	const scraper = objectExtract(obj);
	const data = scraper.episode;
	const url = source.url + hexToString(id)
	const res = await scrapeData(url, data)
	return res
}