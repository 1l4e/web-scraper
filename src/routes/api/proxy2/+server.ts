import { json } from "@sveltejs/kit";
import axios from "axios";

const proxy = "http://localhost:8191/v1";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const image = searchParams.get("image")?.toString();
    const source = searchParams.get("source")?.toString();
    if (!image || !source) {
        return json({ error: 'Image parameter is missing.' });
    }

    try {
        const session = await handleProxySession()
        if (!session) return json({ message: "Error" }, { status: 500 })
        const res3 = await axios.post(proxy, {
            cmd: "request.get",
            url: image,
            "maxTimeout": 60000,
            "session": session
        })
        return new Response(res3.data.solution.response, {
            status: 200
        })
    } catch (error: any) {
        return json({ error: error.message });
    }
}

export async function POST(request: Request) {
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
        const session = await handleProxySession();
        if (!session) return json({ message: "Error" }, { status: 500 })
        const res3 = await axios.post(proxy, {
            cmd: "request.post",
            url: url,
            postData: postData,
            referer: referer,
            "maxTimeout": 60000,
            "session": session,
        })
        console.log(res3.data)
        return new Response(res3.data.solution.response, {
            status: 200
        })
    }
    catch (error) {

    }
}


async function handleProxySession() {
    try {
        const resp = await axios.post(proxy, { cmd: "sessions.list" });
        if (resp.status !== 200) return json({ message: "ERror" }, { status: 500 })
        const sessions = resp.data.sessions;

        let session
        if (sessions.length === 0) {
            const res = await axios.post(proxy, {
                cmd: "sessions.create"
            })
            if (res.status !== 200) { return json({ message: "Proxy Error", status: 500 }) }
            session = res.data.session
        } else {
            session = sessions[0]
        }
        return session
    } catch (error) {
        return null
    }
}
async function destroySession() {
    try {
        const res = await axios.post(proxy, { cmd: "sessions.list" });
        if (res.status !== 200) return json({ message: "Error" }, { status: 500 })
        const sessions = res.data.sessions;
        for (const session of sessions) {
            await axios.post(proxy, { cmd: "sessions.destroy", session: session })
        };

    } catch (error) {
    }
}

const destroySessionInterval = 3 * 60 * 60 * 1000;
setInterval(destroySession, destroySessionInterval);
