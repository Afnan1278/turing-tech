import {lazy } from 'react';



const Login = lazy(()=> import('../pages/Login'));
const HomePage = lazy(()=> import('../pages/index')); 



const routing:any = [
    {path:'/login/:p?', component:Login, exact:true},
    // {path:'/', component:HomePage, exact:true, controller:'1'},
    {path:'/', component:HomePage, exact:true},

   
]



export default routing;
