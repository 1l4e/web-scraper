
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import axios from 'axios';
import { hexToString } from '$lib/util';

export const GET: RequestHandler = async ({ url }) => {
	try {
		const searchParams = url.searchParams
		const link = searchParams.get('url')
		const referer = searchParams.get('referer')
		const token = searchParams.get('token')
		if (!link || !referer) {
			return json({})
		}
		const res = await axios.get(hexToString(link), {
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
				Accept: '*/*',
				'Accept-Language': 'vi,en-US;q=0.7,en;q=0.3',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-CSRF-TOKEN': token,
				'X-Requested-With': 'XMLHttpRequest',
				Referer: referer
			}
		})
		// return json({data:res.data})
		return json({ data: JSON.stringify(res.data) })
	} catch (error) {
		return json({ error: error })
	}
};


export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();
		const { url, postData, referer, token } = data;
		if (!url) {
			return json({ error: 'url is required' })
		}
		if (!postData) {
			return json({ error: 'postData is required' })
		}
		if (!referer) {
			return json({ error: 'referral is required' })
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
				Cookie: 'laravel_session=eyJpdiI6IjV5UmllcW95U1JRMldFTEpGakVsWlE9PSIsInZhbHVlIjoidlwvVVNDOVhlSVRzcm96cGVVaTd3cVQ2QWdcL29aRDNFd013bEhZMldzSVdHdEd4XC9CM0dURnQyXC9qM1EwNVk0TVQ4VExJQUZJUUNFdk9NWVpZN1ZNOFlBPT0iLCJtYWMiOiI2MjhjYjJlMzFjOTQ4MDUzYjgxOTFmYzFkY2E3NDZlZDRlMGFhNzYxYjhkZGY3ZWRkMDMzYTQ3YTBiOGZiYWI1In0%3D; animetvn_saved_films1=["7007|185655"]; popup_facebook_box=1705983905031; XSRF-TOKEN=eyJpdiI6InUxc1VtT2xYR1VGbnhYVnRtK3lNWEE9PSIsInZhbHVlIjoiSDlsSktEZU5KVjByYmVOaWlYaTl0T2kxbTlVdW04SFJDYlpvaEJmTzBNd0JVdkFjbHJYcUtNUXRadzc5akZoWW82bFhnYXh0MjQrYkZqRjhoZ1wvRW5RPT0iLCJtYWMiOiJmNGU1M2RiOGE2ZWMzZGU5ODE3NjRkYzMzYjljYWExNzQ4NmRkNWJhZDNlMTFiY2M0YTkwNjk1YzI4ZmJlYTM3In0%3D'
			},
			withCredentials: true,
		})
		return json(res.data)
	} catch (error) {
		return json({ error: error })
	}
}
