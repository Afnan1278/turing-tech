import React,{useState,useEffect} from 'react';
import { Button, FormControl, Grid, Icon,InputLabel,MenuItem,Select,TextField} from '@mui/material';
import {Link as RLink} from 'react-router-dom';

const Filter = (props:any)=>{
    const [Term,setTerm] = useState('');
    const [callType,setUserType] = useState('all');

    const handlerSearch = ()=>{
        props.onSearch(callType);
    }
    const handlerClear = ()=>{
        setUserType("all")
        props.onSearch("all");
    }
 
    return (
        <Grid container spacing={3} >
            
            <Grid item md={2} sm={6} xs={12}>
                <FormControl size="small" variant="outlined" fullWidth>
                    <InputLabel id="labelStatus">Status</InputLabel>
                    <Select 
                        onChange={(e:any)=>{setUserType(e.target.value)}}
                        value={callType}
                        labelId="labelStatus"
                        label="Status"
                        >
                        <MenuItem value="all" key="all">All</MenuItem>
                        <MenuItem value="archived" key="archived">Archived</MenuItem>
                        <MenuItem value="unarchived" key="archived">Unarchived</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item md={2} sm={6} xs={6}>
                <Button onClick={handlerSearch} size="large" variant="contained" color="primary">
                    <Icon>search</Icon>
                </Button> &nbsp;
                <Button onClick={handlerClear} size="large" variant="contained">
                    <Icon>settings_backup_restore</Icon>
                </Button>
            </Grid> 
        </Grid>
    )
}


export default Filter;