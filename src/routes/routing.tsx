import {lazy } from 'react';



const Login = lazy(()=> import('../pages/Login'));
const HomePage = lazy(()=> import('../pages/index')); 
const Details = lazy(()=> import('../pages/Details')); 




const routing:any = [
    {path:'/login/:p?', component:Login, exact:true},
    {path:'/', component:HomePage, exact:true, controller:'1'},
    {path:'/calls/:id?', component:Details, exact:true, controller:'1'},


   
]



export default routing;
