
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import axios from 'axios';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const searchParams = url.searchParams
		const link = searchParams.get('url')
		const referer = searchParams.get('referer')
		const token = searchParams.get('token')
		if (!link) {
			return json({})
		}
		// const ur = new URL(link)
		const headers: any = {
			Accept: '*/*',
			'Accept-Language': 'vi,en-US;q=0.7,en;q=0.3',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			// 'Host': ur.origin,
			"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
			"Upgrade-Insecure-Requests": "1",
			"Sec-Fetch-Dest": "document",
			"Sec-Fetch-Mode": "navigate",
			"Sec-Fetch-Site": "none",
			"Sec-Fetch-User": "?1"
		}
		referer && (headers['Referer'] = referer)

		token && (headers['X-CSRF-TOKEN'] = token)
		const res = await axios.get(link, {
			headers
		})
		return json({ data: JSON.stringify(res.data) })
	} catch (error: any) {
		return json({ error: error.message })
	}
};


export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const { url, postData, referer, token, type } = data;
		if (!url) {
			return json({ error: 'url is required' })
		}
		if (!postData) {
			return json({ error: 'postData is required' })
		}
		if (!referer) {
			return json({ error: 'referral is required' })
		}
		if (type === 'phimmoi') {

			const res = await axios.post(url, postData, {
				headers: {
					'User-Agent':
						'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
					Accept: '*/*',
					'Accept-Language': 'vi,en-US;q=0.7,en;q=0.3',
					'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
					'X-Requested-With': 'XMLHttpRequest',
					'Alt-Used': 'phimmoiiii.net',
				},
				withCredentials: true,
			})
			return json(res.data)
		}
		const res = await axios.post(url, postData, {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
				Accept: '*/*',
				'Accept-Language': 'vi,en-US;q=0.7,en;q=0.3',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-CSRF-TOKEN': token,
				'X-Requested-With': 'XMLHttpRequest',
				'Alt-Used': referer,
				Referer: referer,
			},
			withCredentials: true,
		})
		return json(res.data)
	} catch (error) {
		return json({ error: error })
	}
}
