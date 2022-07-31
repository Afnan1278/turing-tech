import React,{useEffect} from 'react';

import { useSelector, useDispatch } from 'react-redux'
import {login,logout} from './store/actions';
import {LinearProgress } from '@mui/material';

import auth from './services/auth';


const AppInitializer = (props:any)=>{
    const dispatch = useDispatch();
    const isLogin = useSelector((state:any)=>state.isLogin);
    const isInitialized = useSelector((state:any)=>state.init);
    const theme = useSelector((state:any)=>state.theme);

    const verifyToken = async()=>{
        
        let authSession:any = localStorage.getItem('auth');
        let user = {};
        if(authSession){
            authSession = JSON.parse(authSession);
            user = {token:authSession.token,UserID:authSession.UserID};
        }
        let res:any = await auth.verifyToken(user);
        if(res.success && res.data){
            // dispath login
            dispatch(login(res.data));
        }else{
            dispatch(logout());
        }
    }

    document.body.classList.add(`theme-${theme?theme:'bp'}`)

    useEffect(()=>{
        if(!isLogin){
            verifyToken();   
           
        }
        return ()=>{    }
    },[isLogin])


    
    
    return (
        <>
            {isInitialized?props.children:<SiteLoader/>}
        </>
    )
}

const SiteLoader = ()=>{
    return (
        <div >
            <div >
                {/* <img src={logo}/> */}
                <LinearProgress/> 
            </div>
        </div>
    )
}

export default AppInitializer;

