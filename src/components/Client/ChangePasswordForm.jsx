import React ,{ useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Alert } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import Title from 'components/Title';
import { changePassword } from 'Services/Auth';

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

const ChangePasswordForm = () => {
    const classes = useStyles();
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [status, setStatus] = React.useState(false);

    const handleCreateClientButton = () =>{
        if(
            password === "" &&
            newPassword === "" 
        ){
            setStatus({
                type : "error",
                message : "Unable to create user : Empty Field."
            });
            return;
        }
        changePassword(password, newPassword, ()=>{
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
                      message : "Unable to Chnage : "+response.message
                    })
                }
            })
    }
    return (
        <div>
            {status ? <Alert severity={status.type}>{status.message}</Alert> : ""}
            <Title>Change Admin Password</Title>
            <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        onChange = {e => setPassword(e.target.value)}
                        value = {password}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        type="password"
                        label="New Password"
                        id="newpassword"
                        onChange = {e => setNewPassword(e.target.value)}
                        value = {newPassword}
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

export default ChangePasswordForm
