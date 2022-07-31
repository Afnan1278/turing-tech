import {LOGIN,LOGOUT} from './actionTypes';

export const login = content => {
    localStorage.setItem("auth", JSON.stringify(content));
    return {
        type:LOGIN,
        payload:{
            user:content,
            isLogin: content.token!=null,
            init:true,
            currentApp:content.settings.currentApp }
    }   
}

export const logout = content =>{

    localStorage.removeItem("auth");

    return {
        type:LOGOUT,
        payload:{user:null,isLogin: false,init:true }
    }
}



