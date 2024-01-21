import axios from "axios";

export async function proxy (data:{url:string,postData:string,referer:string}) {
    const res = await axios.post("/api/proxy",data)
    return res
}
