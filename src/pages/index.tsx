import { Button, Grid, Icon, LinearProgress, Paper } from '@mui/material';
import React,{useState,useEffect} from 'react';
import client from '../services/client';
import {Link as RLink} from 'react-router-dom';
import {logout} from '../store/actions';
import Pusher from "pusher-js";


// child components
import Filter from './Filter';
import Listing from './Listing';

import callService from '../services/calls';
import { useDispatch } from 'react-redux';

const Home:React.FC = ()=>{
    const pusher:any = new Pusher(process.env.PUSHER_APP_KEY ? process.env.PUSHER_APP_KEY:'', {
        cluster: process.env.PUSHER_APP_CLUSTER ? process.env.PUSHER_APP_CLUSTER : '',
        auth:{
          headers:{
            'Accept':'application/json',
            'Authorization': 'Bearer ' + client.getAuth()
          }
        },
        authEndpoint: process.env.PUSHER_APP_AUTH_ENDPOINT ? process.env.PUSHER_APP_AUTH_ENDPOINT :''
      });
    const [data,setData]:any = useState({});
    const [dataGrid,setDataGrid]:any = useState({});

    const limit =20;
 
    const [processing,setProcessing] = useState(false);
    // listing filters
    const [filters,setFilters] = useState({offset:0,limit:20});
    const dispatch = useDispatch();

    const search = async()=>{
        setProcessing(true);
        let res:any = await callService.calls.listing({...filters});
        if(res.error){
            window.snakAlert.error(res.message);
            setData({});
            setDataGrid({})
        }else{
            if(!res.error && res.data){
                setData({rows:res.data.nodes,count:res.data.totalCount}); 
                setDataGrid({rows:res.data.nodes,count:res.data.totalCount});    
            }else{
                setData({});
                setDataGrid({})
            }
        }
        setProcessing(false);
    }

    const handlerDelete = async(row:any)=>{
        if(await window.ConfirmationDialog("Call archive",`archive selected call?`)){
            setProcessing(true);
            let res:any = await callService.calls.archive({id:row.id});
            if(res.error){
                window.snakAlert.error(res.message);
                setProcessing(false);
            }else{
                window.snakAlert.success("call archive");
                search();
            }
        }
    }

    const handlerActivate = async(row:any)=>{
        if(await window.ConfirmationDialog("Call Un-Archive",`un-archive selected call?`)){
            setProcessing(true);
            let res:any = await callService.calls.archive({id:row.id});
            if(res.error){
                window.snakAlert.error(res.message);
                setProcessing(false);
            }else{
                window.snakAlert.success("call unarchived");
                search();
            }
        }
    }
    
    useEffect(()=>{
        let mounted  = true
        if (mounted){
            const channel = pusher.subscribe("private-aircall");
            channel.bind("update-call", (call) => {
                console.log("afnan",call)

                // not getting updated data but successfuly sucbcribing to channel and listing to event

                // let filteredArray = data?.rows?.map(e => { 
                //     if(e.id == call.id)
                //         return call
                //     return e
                // })
                // setData({rows:filteredArray,count:data.count})
                //  filteredArray = dataGrid?.rows?.map(e => { 
                //     if(e.id == call.id)
                //         return call
                //     return e
                // })
                // setDataGrid({rows:filteredArray,count:data.count})

            });
        }

        return ()=>{ pusher.unsubscribe("private-aircall"); mounted=false}//cleanup funtion

    },[])
    useEffect(()=>{
        let mounted  = true
        if (mounted){
            if(Object.keys(filters).length > 0)
            search();// if filters present            
        }

        return ()=>{ mounted=false}//cleanup funtion
    },[filters]);

    const handlerSearch = (newFilter:any)=>{
        let offset = limit * (newFilter.page - 1)
        setFilters({...filters,limit,offset});
    }
    const handlerFilter = (callType:any)=>{
        if (callType == 'all')
        setDataGrid({rows:[...data.rows],count:data.count})
        if (callType == 'archived'){
           let filteredArray = data.rows.filter(e => e.is_archived == true)
           setDataGrid({rows:filteredArray,count:data.count})
        }
        if (callType == 'unarchived'){
            let filteredArray = data.rows.filter(e => e.is_archived == false)
            setDataGrid({rows:filteredArray,count:data.count})
         }
        
    }

    return (
        <>
        <div className="page-content">
            <div>

                
                <Grid container spacing={3} justifyContent="space-between">
                    <Grid item md={2} >
                        <h2>Calls: <span>List of all calls</span></h2>
                    </Grid>
                    <Grid item mr={2} mb={5}>
                        <Button onClick={()=>dispatch(logout())} size="large" variant="contained">
                            <Icon>logout</Icon> Logout
                        </Button>
                    </Grid>
                    
                </Grid>
               
            </div>

            <Paper elevation={1} className="section mt-10">
                <Filter onSearch={handlerFilter}/>
            </Paper>
            <LinearProgress style={{display:(processing?'':'none')}} />
            <Paper elevation={1} className="section mt-10">
                <Listing rowPerPage={limit} data={dataGrid} 
                    onPagingChange={handlerSearch} 
                    onDelete={handlerDelete}
                    onActivate={handlerActivate}
                    />      
                    
            </Paper>
            
        </div>
        </>
    )
}


export default Home;