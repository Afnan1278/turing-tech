import React,{useState,useEffect,memo} from 'react';
import {Alert} from '@mui/material/';
import Snackbar from '@mui/material/Snackbar';

enum snakAlertType{
    success='success',
    error='error',
    warning='warning',
    info='info'
}
 
declare global {
    interface Window {
        snakAlert:any
    }
}

window.snakAlert = {
    success:Function,
    warning:Function,
    error:Function,
    info:Function,
    show:Function
}

const SnakAlert:React.FC = ()=>{
    
    const [state,setState]:any = useState({type:snakAlertType.success,open:false,message:''});
    
    const handleClose = (e:any,reason:any)=>{
        if(reason !== 'clickaway')
            setState({...state,open:false});
    }

    window.snakAlert.success = (message:string)=>{
        setState({...state,open:true,message:message,type:snakAlertType.success})
    }
    window.snakAlert.warning = (message:string)=>{
        setState({...state,open:true,message:message,type:snakAlertType.warning})
    }
    window.snakAlert.error = (message:string)=>{
        setState({...state,open:true,message:message,type:snakAlertType.error})
    }
    window.snakAlert.info = (message:string)=>{
        setState({...state,open:true,message:message,type:snakAlertType.info})
    }
    window.snakAlert.show = (res:any)=>{
        if(res.success){
            window.snakAlert.success(res.message);
        }else{
            window.snakAlert.error(res.message);
        }
    }
    
    return (
        <>
        <Snackbar className="snak-alert"
            open={state.open} 
            autoHideDuration={5000} 
            onClose={handleClose} 
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            style={{top:'80px'}}
            >
            <Alert onClose={()=>{handleClose(null,null)}} severity={state.type}>
                {state.message}
            </Alert>
        </Snackbar>
        </>
    )
}


export default memo(SnakAlert);