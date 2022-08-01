import {LOGIN,LOGOUT} from './actionTypes';

export const login = content => {
    localStorage.setItem("auth", JSON.stringify(content));
    return {
        type:LOGIN,
        payload:{
            user:content.user,
            isLogin: content.access_token!=null,
            access_token:content.access_token,
            init:true,}
    }   
}

export const logout = content =>{

    localStorage.removeItem("auth");

    return {
        type:LOGOUT,
        payload:{user:null,isLogin: false,init:true }
    }
}



