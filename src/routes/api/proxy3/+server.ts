

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
        return new Response(res.data, {
            status: 200
        })
    } catch (error: any) {
        return json({ error: error.message })
    }
};
