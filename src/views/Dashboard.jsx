import React from 'react'
import clsx from 'clsx';
import { Button, Grid, makeStyles, Paper, Typography } from '@material-ui/core'
import Title from 'components/Title';
import CreateClientForm from 'components/Client/CreateClientForm';
import ClientList from 'components/Client/ClientList';
import ChangePasswordForm from 'components/Client/ChangePasswordForm';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    paperTitle: {
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        textAlign: 'center'
    },
    fixedHeight: {
        height: 240,
    },
    fixedHeightSecond: {
        height: 340,
    },
    generatedTokenPaper : {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
        wordWrap : 'break-word',
        fontSize : 17,
        fontWeight : 800,
        animation: 'kf-color-mix 1s linear infinite alternate',
        color : 'red'
    }
}));
const Dashboard = () => {
    const classes = useStyles();
    const fixedHeightTitle= clsx(classes.paperTitle, classes.fixedHeightTitle);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperSecond = clsx(classes.paper, classes.fixedHeightSecond);
    const [generatedToken, setGeneratedToken] = React.useState("Create client and click generate token button.");
    
    const [copyStatus, setCopyStatus] = React.useState("Copy");
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Paper className={fixedHeightTitle} >
                    <Title>Dashboard</Title>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaper}>
                  <CreateClientForm/>
              </Paper>
            </Grid>
            {/* second column */}
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                  <ClientList setGeneratedToken = {setGeneratedToken}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={fixedHeightPaperSecond}>
                  <ChangePasswordForm/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
              <Paper className={fixedHeightPaperSecond}>
                <Typography variant="h5" gutterBottom>Get Generated Token</Typography>
                <p>Use this token as Authorization Header to get access to Satellite APIs.</p>
                <Paper className={classes.generatedTokenPaper}>
                    {generatedToken}
                </Paper>
                <Button className={classes.marginHorizontal} size="small" variant="contained" color="primary"
                    onClick={()=>{
                        navigator.clipboard.writeText(generatedToken);
                        setCopyStatus("Copied 😎")
                    }}
                >
                    {copyStatus}
                </Button>
              </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default Dashboard;
