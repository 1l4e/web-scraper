import axios from "axios";

export async function animetvnProxy(server: any, source: any) {
    const servers = []
    const url = source?.scraper?.data?.post?.selector[0]
    const postData = {
        epid: server.animetvn
    }
    const cookies = JSON.parse(source.cookie);
    const cookie = cookies.join(';');

    if (!cookie && !source?.csrf) {
        throw new Error('Cookie or CSRF not found')
    }
    const res = await axios.post(url, postData, {
        headers: {
            'Content-Type': 'multipart/form-data;',
            'X-CSRF-TOKEN': source.csrf,
            'Cookie': cookie
        },
        withCredentials: true
    })
    if (res.status !== 200) {
        return []
    }
    const embedData = res.data;
    const { links } = embedData
    for (const link of links) {
        const res = await axios.post(url.slice(0, -1), { id: link.id, link: link.link }, {
            headers: {
                'Content-Type': 'multipart/form-data;',
                'X-CSRF-TOKEN': source.csrf,
                'Cookie': cookie
            },
            withCredentials: true
        })
        if (res.status !== 200) {
            return
        }
        const play = res.data.link
        if (play.includes('play.playhbq.xyz')) {
            const res3 = await axios.post("https://api-plhq.playhbq.xyz/apiv4/61211fa59c0163458e94b0c0/65ad3d6a98d0b7cbeb50ebe1", {
                referer: 'https://animetvn3.com',
                typeend: "html"
            }, {
                headers: {
                    'Content-Type': 'multipart/form-data;',
                    "referrer": "https://play.playhbq.xyz/",
                },
            })
            console.log(res3.data)
            // servers.push(`http://localhost:5173/api/proxy?url=${play}&referer=${url}&token=${source.csrf}`)
        }
        servers.push(play)
    }
    return servers
}
