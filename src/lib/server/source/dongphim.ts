import axios from "axios"

export async function dp(server: any) {
    const servers: any = []
    const tests: any = []
    try {
        server.forEach((item: any) => {
            if (item.type === 'embed' && !item.dongphim.includes('https://hcplayer')) {
                tests.push(item.dongphim)
            }
        })
        for (let i = 0; i < tests.length; i++) {
            const res = await axios.get(tests[i])
            if (res.status !== 404) {
                servers.push(tests[i])
            }
        }
        return servers
    } catch (error) {
        return servers
    }

}
