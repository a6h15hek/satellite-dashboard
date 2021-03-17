import React ,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { createUser } from 'Services/Auth';

const useStyles = makeStyles((theme) => ({
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
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));

const CreateUserForm = () => {
    const classes = useStyles();
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [status, setStatus] = React.useState(false);
    const handleCreateUserButton = () =>{
        if(
            email === "" ||
            password === "" ||
            firstname === "" ||
            lastname === ""
        ){
            setStatus({
                type : "error",
                message : "Unable to create user : Empty Field."
            });
            return;
        }
        createUser(firstname, lastname, email, password, ()=>{
            setStatus({
                type : "info",
                message : "Loading..."
            });
        },response=>{
            if(response.success){
                setStatus({
                    type : "success",
                    message : "Success : "+response.message
                  })
              }else{
                setStatus({
                  type : "error",
                  message : "Unable to Create : "+response.message
                })
            }
        })
    }
    return (
        <div>
            {status ? <Alert severity={status.type}>{status.message}</Alert> : ""}
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        onChange = {e => setFirstname(e.target.value)}
                        value = {firstname}
                        autoFocus
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lname"
                        onChange = {e => setLastname(e.target.value)}
                        value = {lastname}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange = {e => setemail(e.target.value)}
                        value = {email}
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange = {e => setpassword(e.target.value)}
                        value = {password}
                    />
                    </Grid>
                </Grid>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick = {handleCreateUserButton}
                >
                    Create User
                </Button>
            </form>
        </div>
    )
}

export default CreateUserForm
