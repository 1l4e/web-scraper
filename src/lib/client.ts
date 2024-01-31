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
	const obj: any = source.scraper.data;
	const scraper = objectExtract(obj);
	const data = scraper.home;
	const category = scraper.category;
	const categoryItem = scraper.categoryitem;
	const url = source.url
	const options = {
		category,
		page,
		categoryItem
	}
	const res: any = await scrapeData(url, data, source, options)
	// console.log(res)
	return { sourceId: source.id, categories: res.scrapedData, categoryData: res.categoryData }

}


export const getParent = async (sourceId: string, id: string) => {
	let source = await prisma.source.findFirst({
		where: {
			id: sourceId
		},
		include: {
			scraper: true
		}
	})
	if (!source) return { parent: null, sourceData: null }
	const obj: any = source.scraper.data;
	const scraper = objectExtract(obj);
	const data = scraper.parent;
	// const url = source.url + hexToString(id)
	const url = new URL(hexToString(id), source.url).href
	const res: any = await scrapeData(url, data, source)
	return { parent: res.scrapedData, sourceData: source }
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
	const url = new URL(hexToString(id), source.url).href
	const res: any = await scrapeData(url, data, source)
	return { episode: res.scrapedData, sourceData: source }
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
	// const url = source.url + scraper?.search?.[1]?.selector?.replace('*', keyword)
	const url = new URL(scraper?.search?.[1]?.selector?.replace('*', keyword), source.url).href
	const res: any = await scrapeData(url, data, source)
	return { search: res.scrapedData }
}

export const getCategory = async (sourceId: string, id: string, page: string) => {
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
	const data = scraper.categorypost;
	const pageSelector = scraper.pagination?.[0].selector;
	const pageParams = pageSelector?.replace('*', page);
	const url = new URL(hexToString(id), source.url).href + pageParams
	const res: any = await scrapeData(url, data, source, { page })
	return { category: res.scrapedData, sourceData: source }
}
