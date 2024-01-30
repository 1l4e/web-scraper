


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
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
            'Accept': '*/*',
            'Accept-Language': 'vi,en-US;q=0.7,en;q=0.3',
            'X-Requested-With': 'XMLHttpRequest',
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
