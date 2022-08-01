import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { LinearProgress } from '@mui/material';
import auth from '../services/auth';
import { useDispatch, useSelector } from 'react-redux';
import {login} from '../store/actions';
import {useHistory} from 'react-router-dom';




const Login: React.FC = ()=> {
    const dispatch = useDispatch();
    const history = useHistory();

    const isLogin = useSelector((state:any)=>state.isLogin);

    const [processing,setProcessing] = React.useState(false);


    if(isLogin){
        history.push('/');
    }
  
  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    setProcessing(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        username: data.get('username'),
        password: data.get('password'),
       });
      
    let res:any = await auth.login({username:data.get('username'),password:data.get('password')});
    if (!res.error)
    {
        dispatch(login(res.data))
    }
    setProcessing(false)

    
  };

  return (
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
                disabled={processing}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <LinearProgress style={{display: processing?'':'none' }} />
          </Box>
        </Box>
  );
}

export default Login;