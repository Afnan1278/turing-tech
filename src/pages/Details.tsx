import {
    Button,
    Grid,
    LinearProgress,
    Paper,
    Stack,
    Icon,
    TextField,
  } from "@mui/material";
import moment from "moment";
  import React, { useState, useEffect } from "react";
  import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
  import { Link as RLink, useHistory } from "react-router-dom";
  import { useParams } from "react-router-dom";
  import callService from '../services/calls';

   
  const Details: React.FC = () => {
    const param = useParams();
    const history = useHistory();
  
  
    const [processing, setProcessing] = useState<boolean>(false);
  
    const [details, setDetails] = useState<any|null>(null);
    const [showButton, setShowButton] = useState<boolean>(false);

    const [content, setContent] = useState<string>('');

  
    
  
    const getRecord = async () => {
      setProcessing(true);
      let res: any = await callService.calls.details({ id: param.id });
      if (res.error) {
        window.snakAlert.error(res.message);
        setDetails(null);
      } else {
        if (!res.error && res.data) {
          setDetails(res.data);
        } else {
          window.snakAlert.error(res.message);
        }
      }
      setProcessing(false);
    };
  
    const handleSave = async () => {
      setProcessing(true);
      let res: any = await callService.calls.addContent({ id: param.id,content:content });
      if (!res.error)
      {
        history.push('/');
      }
      setProcessing(false);
    };
   
    useEffect(() => {
     getRecord();
    }, []);
    return (
      <>
        <div className="page-content">
          
          <LinearProgress
           
            style={{ display: processing ? "" : "none" }}
          />
          <h2>Call: <span>Details Page</span></h2>
          <Paper elevation={1} className="section mt-10">
            {
              details && 
              <>
              <Stack spacing={3} >
                <div>TO: {details?.to}</div>
                <div>From: {details?.from}</div>
                <div>Via: {details?.via}</div>
                <div>Call Type: {details?.call_type}</div>
                <div>Duration: {details?.duration}</div>
                <div>Created: {moment(details?.created_at).format('DD-MM-YYYY')}</div>
               
                <Grid container spacing={0}>
                    <Grid item md={1}>
                    <h2>Notes</h2>
                    </Grid>
                    <Grid item md={1} mt={2}>
                      <Button disabled={showButton} variant="contained" size="small" color="primary" onClick={()=>setShowButton(true)}>
                      <Icon>note_add_rounded_icon</Icon> Add Note
                      </Button>
                    </Grid>
                </Grid>
                {details?.notes.length > 0 &&
                  details?.notes.map((note,index)=>(
                    <div>Note: {note.content}</div>

                  ))
                }
                {
                  showButton && <TextField variant="outlined" size="small" fullWidth label="Name"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
              />
                }
                

              </Stack>
              </>
            }
          </Paper>
          <Grid container mt={2} justifyContent="flex-end">
            <Grid item md={0.8}>
                      <Button disabled={!showButton} variant="contained" size="large" color="primary" onClick={handleSave}>
                      <Icon>save</Icon> Save
                      </Button>
            </Grid>
                     
          </Grid>
        </div>
      </>
    );
  };
  
  export default Details;
  