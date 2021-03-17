import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Button, Grid, Paper } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    main: {
      marginTop: theme.spacing(8),
      marginBottom: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2)
    },
    gridcontainer : {
        marginTop : 10
    },
    links : {
        fontWeight : 700,
        cursor : 'pointer',
        color : '#1976d2'
    },
    divider :{
        fontWeight : 900,
        fontSize : 20
    }
}));

const Home = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
        <CssBaseline />
        <Container component="main" className={classes.main} maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
                PHP Satellite Backend App
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
                Satellite Backend App is an open source backend that can be deployed to any infrastructure that can run PHP.
          </Typography>
          <Typography variant="body1">Info</Typography>
          <Grid container spacing={3} className={classes.gridcontainer}>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                        PHP Sattelite Server
                    </Typography>
                    <div><b>Documentation : </b> <a className={classes.links}  rel="noreferrer" href="https://github.com/a6h15hek/php-satellite/blob/master/README.md" target="_blank">https://github.com/a6h15hek/php-satellite/blob/master/README.md</a>  </div>
                    <div><b>Github Project : </b> <a className={classes.links}  rel="noreferrer" href="https://github.com/a6h15hek/php-satellite" target="_blank">https://github.com/a6h15hek/php-satellite</a> </div>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" >
                        PHP Sattelite Dashboard
                    </Typography>
                    <b>made with ReactJS + Material UI</b>
                    <br/><br/>
                    <Button component={ Link } to="/console" variant="contained" color="primary">
                        Go to Console
                    </Button>
                    {/* <div><b>Documentation : </b> <a className={classes.links}  rel="noreferrer" href="https://github.com/a6h15hek/php-satellite/blob/master/README.md" target="_blank">https://github.com/a6h15hek/php-satellite/blob/master/README.md</a>  </div>
                    <div><b>Github Project : </b> <a className={classes.links}  rel="noreferrer" href="https://github.com/a6h15hek/php-satellite" target="_blank">https://github.com/a6h15hek/php-satellite</a> </div> */}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={classes.paper}>
                    <Typography variant="h6" gutterBottom>
                        Developed By 
                    </Typography>
                    <div>
                        <b>Abhishek Yadav</b>  <b className={classes.divider}> | </b>
                        <a className={classes.links}  rel="noreferrer" href="https://github.com/a6h15hek" target="_blank">github/a6h15hek</a> 
                        <b className={classes.divider}> | </b>
                        <a className={classes.links}  rel="noreferrer" href="https://www.linkedin.com/in/abhishek-yadav-02a087192/" target="_blank">linkedin/AbhishekYadav</a> 
                    </div>
                </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    )
}

export default Home
