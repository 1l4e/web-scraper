import axios from "axios"

export async function dp(server: any) {
    const servers: any = []
    const tests: any = []
    try {
        server.forEach((item: any) => {
            if (item.type === 'embed' && !item.dongphim.includes('https://hcplayer')) {
                tests.push({ src: item.dongphim, type: "embed" })
            }
            if (item.type === 'm3u8') {
                servers.push({ src: item.dongphim, type: "m3u8" })
            }
        })
        for (let i = 0; i < tests.length; i++) {
            const res = await axios.get(tests[i].src)
            if (res.status !== 404) {
                servers.push({ src: tests[i].src, type: tests[i].type })
            }
        }
        return servers
    } catch (error) {
        return servers
    }

}
