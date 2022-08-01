import React,{useState,useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Icon } from '@mui/material';

/**
 * call 
 * window.ConfirmationDialog("",callback) // return true/false
 * 
 */
declare global {
    interface Window {
        ConfirmationDialog:any
    }
}

const ConfirmationDialog = (props:any)=>{
    const [open, setOpen] = useState(false);
    const [message,setMessage] = useState('');
    const [title,setTitle] = useState('');
    const btnCancel:any = useRef(null);
    const btnConfirm:any = useRef(null);

    const handleClose = () => {
        setOpen(false);
    };
  
    // open dialog
    window.ConfirmationDialog = async(title:string,message:string)=>{
        setOpen(true); 
        setMessage(message);
        setTitle(title);
        // wait for the dialog to open
        await new Promise(resolve => setTimeout(resolve, 300));
        // promise
        return new Promise((resolve,reject)=>{
          
            if(btnCancel && btnCancel.current){
                btnCancel.current.addEventListener('click',()=>{
                    setOpen(false);
                    return resolve(false);
                });
            }
            if(btnConfirm && btnConfirm.current){
                btnConfirm.current.addEventListener('click',()=>{
                    setOpen(false);
                    return resolve(true);
                });
            }
        });
    }

    return (
      <div>
        <Dialog
          open={open}
          fullWidth={true}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          disableEscapeKeyDown={true}
          className="modal-dialog"
        >
          <DialogTitle id="alert-dialog-title" sx={{paddingLeft:'46px'}}> <Icon >error_outline</Icon> {title}</DialogTitle>
          <DialogContent dividers>
          {message}
          </DialogContent>
          <DialogActions>
            <Button id="btn-confirmation-dialog-cancel" ref={btnCancel} variant="contained" size="small">Cancel</Button>
            <Button ref={btnConfirm} variant="contained" color="secondary" autoFocus size="small">Confirm</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  export default ConfirmationDialog;