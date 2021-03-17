import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Alert } from '@material-ui/lab';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Footer from 'components/Footer';
import { signIn } from 'Services/Auth';


const useStyles = makeStyles((theme) => ({
  statusErrorMessage : {
    fontWeight : 700,
    color : '#f44336'
  },
  statusSuccessMessage : {
    fontWeight : 700,
    color : '#00FF00'
  },
  statusMessage : {
    fontWeight : 700,
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn({handleAuthState, isLoggedIn}) {
  const classes = useStyles();
  const history = useHistory();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if(isLoggedIn){
      history.push('/console')
    }
  },[isLoggedIn, history]);
  const handleSignIn = () =>{
    if(email === "" || password === ""){
      setStatus({
        type : "error",
        message : "Unable to login : Empty Field."
      })
      return;
    }
    signIn(email, password, ()=>{
      setStatus({
        type : "info",
        message : "Loading..."
      })
    },response=>{
      if(response.success){
        handleAuthState(true);
        history.push('/console');
      }else{
        setStatus({
          type : "error",
          message : "Unable to login : "+response.message
        })
      }
    });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          {status ? <Alert severity={status.type}>{status.message}</Alert> : ""}
          
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange = {e => setemail(e.target.value)}
            value = {email}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange = {e => setpassword(e.target.value)}
            value = {password}
            autoComplete="current-password"
          />
          
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {handleSignIn}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Footer/>
      </Box>
    </Container>
  );
}