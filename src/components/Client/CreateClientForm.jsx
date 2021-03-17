import React ,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Title from 'components/Title';
import { createClient } from 'Services/client';

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

const CreateClientForm = () => {
    const classes = useStyles();
    const [appName, setAppName] = useState("");
    const [status, setStatus] = React.useState(false);
    const handleCreateClientButton = () =>{
        if(
            appName === "" 
        ){
            setStatus({
                type : "error",
                message : "Unable to create user : Empty Field."
            });
            return;
        }
        createClient(appName, ()=>{
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
            });
    }
    return (
        <div>
            {status ? <Alert severity={status.type}>{status.message}</Alert> : ""}
            <Title>Create Client</Title>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            autoComplete="fname"
                            name="Appname"
                            variant="outlined"
                            required
                            fullWidth
                            id="firstName"
                            label="App Name"
                            onChange = {e => setAppName(e.target.value)}
                            value = {appName}
                            autoFocus
                        />
                    </Grid>
                </Grid>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick = {handleCreateClientButton}
                >
                    Create Client
                </Button>
            </form>
        </div>
    )
}

export default CreateClientForm
