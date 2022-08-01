import client from './client';

const login = async (params) => {
    let res: any = await client.post('/auth/login', params);
    return res;
}


const verifyMe = async () => {
    let res: any = await client.get('/me', {});
    return res;
}

const logout = async () => {
    let res: any = await client.put('/auth/logout', {});
    return res;
}

const updateToken = async () => {
    let res: any = await client.post('/auth/refresh-token', {});
    return res;
}



export default {
    login, verifyMe, logout, updateToken
}