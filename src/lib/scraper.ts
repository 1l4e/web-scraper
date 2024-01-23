import axios from "axios";
import * as cheerio from 'cheerio'
import prisma from "./server/prisma";


export async function scrapeData(url: string, configObject: any, sourceId?: string) {
	try {
		const response = await axios.get(url);
		const html = response.data;

		const $ = cheerio.load(html);

		const setCookieHeaders = response.headers["set-cookie"]
		const cookies = setCookieHeaders?.map(cookie => cookie.split(';')[0]);
		let csrfSection: any = {}
		let csrf = ''
		configObject.forEach((child: any) => {
			if (child.name === 'csrf') {
				csrfSection = child
			}
		})
		if (csrfSection) {
			csrf = $(csrfSection.selector).attr(csrfSection?.children?.[0]?.selector) || ""
		}

		if (sourceId) {
			const data: any = {
			}
			cookies && (data.cookie = JSON.stringify(cookies))
			csrf && (data.csrf = csrf)
			await prisma.source.update({
				where: {
					id: sourceId
				},
				data
			})
		}
		const scrapedData = scrapeSection(configObject, $);
		return scrapedData;
	} catch (error) {
		console.error('Error scraping data:', error);
		return []
	}
}
function scrapeSection(configObject: any, $: any, childElement?: any, multi?: string) {
	const scrapedData: any = []
	if (childElement) {
		// const selector = configObject[0].selector
		// const childrenObject = configObject[0].children
		$(childElement).find(multi).each((index: number, element: any) => {
			const multiItem: any = {}
			configObject?.forEach((child: any) => {
				let value = ''
				const fieldName = child.name.toLowerCase()
				const selector = child.selector
				const type = child.type
				const children = child.children
				if (type === 'attributes') {
					value = $(element).attr(selector) || $(element).text();
				}
				if (type === 'html' || type === 'group') {
					// value = "html"
				}
				if (type === 'image') {
					value = $(element).find(selector).attr('src');
				}
				if (type === 'url') {
					value = $(element).find(selector).attr('href');
				}
				if (type === 'text') {
					value = $(element).find(selector).text();
				}
				if (children) {
					const parentHtml = $.html(element);
					const $children = cheerio.load(parentHtml);
					const childrenData: any = scrapeSection(children, $children, element, multi);
					value = childrenData;
				}
				multiItem[fieldName] = value
			})
			scrapedData.push(multiItem)
		})
	}
	else {
		for (const sectionConfig of configObject) {
			const selector = sectionConfig.selector.toString()
			const type = sectionConfig.type
			if (type === 'none') {
				continue
			}
			const childrenObject = sectionConfig.children
			$(selector).each((index: any, element: any) => {
				const multiItem: any = {}
				childrenObject?.forEach((child: any) => {
					let value = ''
					const fieldName = child.name.toLowerCase()
					const selector = child.selector
					const type = child.type
					if (type === 'attributes') {
						value = $(element).attr(selector)
					}
					const children = child.children
					if (type === 'html' || type === 'group') {
						value = "html"
					}
					if (type === 'image') {
						value = $(element).find(selector).attr('src');
					}
					if (type === 'url') {
						value = $(element).find(selector).attr('href');
					}
					if (type === 'text') {
						value = $(element).find(selector).text();
					}
					if (children) {
						const parentHtml = $.html(element);
						const $children = cheerio.load(parentHtml);
						const childrenData: any = scrapeSection(children, $children, element, selector);
						value = childrenData;
					}
					multiItem[fieldName] = value
				})
				scrapedData.push(multiItem)
			})
		}
	}
	return scrapedData
}


