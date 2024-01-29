export async function dp(server: any) {
    const servers: any = []
    try {
        server.forEach((item: any) => {
            if (item.type === 'embed') {
                servers.push(item.dongphim)
            }
        })
        return servers
    } catch (error) {
        return servers
    }

}
