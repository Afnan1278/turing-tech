import client from './client';

const login = async(params)=>{    
    let res:any = await client.post('/auth/',params);
    return res;
}
const signup = async(params)=>{    
    let res:any = await client.post('/signup/',params);
    return res;
}

const verifyToken = async(params)=>{
    let res:any = await client.put('/auth/verifyToken',params);
    return res;
}

const logout = async()=>{
    let res:any = await client.put('/auth/logout',{});
    return res;
}
const MFALogin = async(params)=>{
    let res:any = await client.post('/auth/MFALogin',params);
    return res;
}


export default {
    login,verifyToken,logout, MFALogin,signup
}