import React,{useState,useEffect,memo} from 'react';
import {Alert,AlertTitle,Paper} from '@mui/material/';

export enum ALERT_TYPE {
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info',
    SUCCESS = 'success'
}

const AlertMessage:React.FC<any> = ({type,message})=>{
    //const {message} = props;
    const [state,setState] = useState<any|null>(null);
    
    useEffect(() => {
        if(message)
            setState({type:type,message:message});
    }, [message])

    return (
        <>
        {state && state.message?
            <Paper className='mb-10'>
                <Alert severity={state.type}>
                    <AlertTitle style={{textTransform:'capitalize'}}>{state.type}</AlertTitle>
                    {state.message}
                </Alert>
            </Paper>
        :''}
        </>
    )
}

export default AlertMessage;