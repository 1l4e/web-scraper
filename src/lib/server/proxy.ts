import axios from "axios";

export async function proxy (data:{url:string,postData:string,referer:string, token:string}) {
    const res = await axios.post("/api/proxy",data)
    return res
}

export async function proxy2 (data:{url:string,postData:string,referer:string, token:string}) {
    const res = await axios.post("/api/proxy2",data)
    return res
}
