import axios from "axios"

export async function dp(server: any, url: string) {
    const servers: any = []
    const tests: any = []
    console.log(server)
    try {
        server.forEach((item: any) => {
            if (item.type === 'embed') {
                // if (item.type === 'embed' && !item.dongphim.includes('https://hcplayer')) {
                tests.push({ src: item.dongphim, type: "embed" })
            }
            if (item.type === 'm3u8') {
                servers.push({ src: url + "/api/proxy4?url=" + item.dongphim, type: "m3u8" })
                // servers.push({ src: url + '/api/proxy3?url=' + item.dongphim, type: "m3u8" })
            }
        })
        for (let i = 0; i < tests.length; i++) {
            if (tests[i].src.includes('https://hcplayer')) {
                const urr = new URL(tests[i].src)
                const id = urr.pathname.split("/")[2]
                const query = '?data=' + id + '&do=getVideo'
                const formData = new FormData();
                formData.append('hash', id);
                formData.append('r', 'https://dongphim.co/');
                const headers = {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/118.0',
                    'Accept': '*/*',
                    'Accept-Language': 'vi,en-US;q=0.7,en;q=0.3',
                    'X-Requested-With': 'XMLHttpRequest',

                }
                const res = await axios.post(urr.origin + "/player/index.php" + query, formData, {
                    headers
                })
                if (res.status === 200) {
                    const res2 = await axios.get(res.data.securedLink, {
                        headers
                    });
                    if (res2.status === 200) {
                        const raw = res2.data;
                        const urlPattern = /https:\/\/\S+/g;

                        // Find all matches in the M3U content
                        const matches = raw.match(urlPattern);
                        if (matches) {
                            servers.push({ src: url + "/api/proxy4?url=" + matches[0], type: "m3u8" })
                        }
                    }
                }
            }
            else {
                servers.push({ src: tests[i].src, type: "embed" })
            }
        }
        servers.sort((a: any, b: any) => {
            if (a.type === 'embed' && b.type !== 'embed') {
                return -1;
            } else if (a.type !== 'embed' && b.type === 'embed') {
                return 1;
            } else {
                return 0;
            }
        });
        console.log(servers)
        return servers
    } catch (error: any) {
        console.log(error.message)
        return servers
    }

}
