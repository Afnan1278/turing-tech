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
        if(authSession){
            authSession = JSON.parse(authSession);
        }
        await updateToken()
        let res:any = await auth.verifyMe();
        if(!res.error && res.data){
            // dispath login
            dispatch(login({access_token:authSession.access_token,isLogin:true,init:true,user:res.data}));
        }else{
            dispatch(logout());
        }
    }

    document.body.classList.add(`theme-${theme?theme:'bp'}`)
    const updateToken = async()=>{
        let res:any = await auth.updateToken();
        if(!res.error && res.data){
            dispatch(login(res.data));
        }else{
            dispatch(logout());
        }

    }
    useEffect(()=>{
        if(!isLogin){
            verifyToken();   
           
        }
        const intervalId = setInterval(() => {
            updateToken()
          }, 540000) 
          return () => clearInterval(intervalId) //cleanup
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

