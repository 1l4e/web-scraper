import axios from "axios";


export class ScraperClient {
	constructor() {
	}


	async get($: Function, scraper: any) {
		const { name, selector, type, multiple, children } = scraper;
		let returnData = {}
		if (multiple){
			$(selector).each((index, element) => {

			})
		}
		else {
			$(selector)
		}
	}

	async request(url: string) {
		try {
			const headers = {
			}
			const config = {
				method: 'GET',
				url: url,
				headers: headers,
			}
			const res = await axios(config);
			return res.data
		}
		catch (err: any) {
			return { error: true, message: err.message }
		}
	}
}
