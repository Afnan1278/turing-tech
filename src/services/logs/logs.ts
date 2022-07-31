

import client from '../client';

const listing = async (params) => {
    let res: any = await client.get("/logs/list", params);
    return res;
}

export default {
    listing
}