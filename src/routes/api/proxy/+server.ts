
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import axios from 'axios';

export const GET: RequestHandler = async ({ url }) => {
    const searchParams = url.searchParams
    const link = searchParams.get('url')

    return json({})
};


export const POST: RequestHandler = async ({request}) => {
    // console.log(await request.json())
    const data = await request.json();
    const {url, postData,referer} = data;
    if (!url) {
        return json({error: 'url is required'})
    }
    if (!postData) {
        return json({error: 'postData is required'})
    }
    if (!referer) {
        return json({error: 'referral is required'})
    }
    const res = await axios.post(url,postData,{
			headers: {
				'User-Agent':
					'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
				Accept: '*/*',
				'Accept-Language': 'vi,en-US;q=0.7,en;q=0.3',
				'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
				'X-Requested-With': 'XMLHttpRequest',
				'Alt-Used': 'phimmoiyyy.net',
				Referer: referer
			}
    })
    return json(res.data)
}
