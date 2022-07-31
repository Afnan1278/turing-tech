/**
 * Full width dialog
 * props
    {
        title:string
        component:<Component/>
        open,
        onClose
    }
 */
import {AppBar,Stack, Dialog, DialogTitle, Divider, Icon, IconButton, Paper, TableRow, Toolbar, Typography } from "@mui/material";
import React,{useState,useMemo,useEffect} from "react";
import CloseIcon from '@mui/icons-material/Close';
    
const ModalDialog = (props:any)=>{
    const {title,component,onClose,open,fullScreen,maxWidth,fullWidth,className} = props;
    
    return (
        <>
            <Dialog
                fullScreen={fullScreen==null?true:fullScreen}
                fullWidth={fullWidth==null?true:fullWidth}
                maxWidth={maxWidth==null?"md":maxWidth}
                open={open}
                className={className?className:''}
                //onClose={onClose}
                //TransitionComponent={Transition}
            >
                {(fullScreen==null || fullScreen==true) &&
                <AppBar color="secondary">
                    <Toolbar>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"> {title}</Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                        >
                        <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                }   
                {fullScreen==false && 
                <>
                <DialogTitle className="dialog-title" >{title}</DialogTitle>
                <div style={{position:'absolute',right:'10px',top:'10px'}}>
                    <IconButton
                        
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                    ><CloseIcon /></IconButton>
                </div>
                <Divider/>
                </>
                }
                <Paper elevation={0} className="section" style={{overflow:'auto',paddingTop:(fullScreen==null||fullScreen==true)?'38px':'0'}}>
                    {component}
                </Paper>
            </Dialog>
        </>
    )
}


export default ModalDialog;