

import client from '../client';

const listing = async (params) => {
    let res: any = await client.get("/calls", params);
    return res;
}
const details = async (params) => {
    let res: any = await client.get(`/calls/${params.id}`, {});
    return res;
}
const addContent = async (params) => {
    let res: any = await client.post(`/calls/${params.id}/note`, { content: params.content });
    return res;
}
const archive = async (params) => {
    let res: any = await client.put(`/calls/${params.id}/archive`, {});
    return res;
}

export default {
    listing, details, addContent, archive
}