import React,{Suspense } from 'react';
import {Switch,Route, Redirect} from "react-router-dom";
import { LinearProgress } from '@mui/material';

import {useSelector} from 'react-redux';


import routing from './routing';

const ProtectedRoute = (props:any)=>{
    const isLogin = useSelector((state:any)=>state.isLogin);
    
    if( isLogin && props.controller)
        return <Route {...props}></Route>;
    else 
        return <Redirect to="/login"/>;
}

const Routers = ()=>{
    
    const routeComponents = routing.map((r:any, key:number) =>{
        if(r.controller)
            return <ProtectedRoute path={r.path} exact component={r.component} controller={r.controller} key={key} />
        else
            return <Route path={r.path} exact component={r.component} key={key} />
    });
    
    return(
        <Suspense fallback={<Fallback/>}>
            
            <div className="container">
                <Switch>
                    {routeComponents}
                </Switch>
            </div>
        </Suspense>
    )
}

const Fallback = ()=>{
    return (
        <>
            <div style={{paddingTop:'38px'}}></div>
            <LinearProgress/>  
        </> 
    )
}



export default Routers;