
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import axios from 'axios';

export const GET: RequestHandler = async ({ url }) => {
    try {
        const searchParams = url.searchParams
        const link = searchParams.get('url')
        const referer = searchParams.get('referer')
        const token = searchParams.get('token')
        const cookie = searchParams.get('cookie')
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
        cookie && (headers['Cookie'] = cookie)
        const res = await axios.get(link, {
            headers
        })
        const data = res.data;
        const lines = data.split('\n');
        let newFile = ''
        const proxy = url.origin + "/api/proxy4?url="
        const prefix = link.toString().split('/').slice(0, -1).join('/')
        for (let j = 0; j < lines.length; j++) {
            if (lines[j].startsWith('https://')) {
                newFile += proxy + lines[j] + '\n'
            }
            else if (!lines[j].startsWith('#')) {
                newFile += proxy + prefix + "/" + lines[j] + '\n'
            }
            else {
                newFile += lines[j] + '\n'
            }
        }
        return new Response(newFile, {
            status: 200,
            // headers:{
            //     'Content-Type': 'text/html'
            // }
        })
    } catch (error: any) {
        return json({ error: error.message })
    }
};
