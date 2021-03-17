import React from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

// list material elements
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import StorageIcon from '@material-ui/icons/Storage';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Alert } from '@material-ui/lab';

//import Components
import Dashboard from "views/Dashboard";
import Authentication from "views/Authentication";
import CloudDatastore from "views/CloudDatastore";
import Footer from 'components/Footer';
import { signOut } from 'Services/Auth';
import { Snackbar } from '@material-ui/core';
import { getUser } from 'Services/Auth';

// import AssignmentIcon from '@material-ui/icons/Assignment';
// import CodeIcon from '@material-ui/icons/Code';
// import ListSubheader from '@material-ui/core/ListSubheader';
// import Documentation from "views/Documentation";
// import CodeExample from "views/CodeExample";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  usernameButton :{
      marginRight : 10,
      color : '#000'
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
  }
}));

export default function ConsoleNavLayout({ handleAuthState }) {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = React.useState(true);
    const [Username, setUsername] = React.useState("");
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    React.useEffect(()=>{
      getUser(()=>{
        //wait
      },response=>{
        setUsername(response.firstname + " " + response.lastname)
      })
    },[])

    const logOut = () =>{
      signOut(()=>{
        //wait
        handleSnackbarOpen("info","Loading...");
      },response=>{
        if(response.success){
          handleAuthState(false);
          history.push('/signin');
        }else{
          handleSnackbarOpen("error","Error : "+response.message);
        }
      });
    }

    const mainListItems = (
        <div>
        <ListItem button   component={NavLink} to="/console">
            <ListItemIcon>
            <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button  component={NavLink} to="/console/authentication">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText  primary="Authentication" />
        </ListItem>
        <ListItem button   component={NavLink} to="/console/cloud-datastore">
            <ListItemIcon>
                <StorageIcon/>
            </ListItemIcon>
            <ListItemText primary="Cloud Datastore" />
        </ListItem>
        </div>
    );
    // const secondaryListItems = (
    //     <div>
    //     <ListSubheader inset>Guides</ListSubheader>
    //     <ListItem button   component={NavLink} to="/console/documentation">
    //         <ListItemIcon>
    //         <AssignmentIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Documentation" />
    //     </ListItem>
    //     <ListItem button  component={NavLink} to="/console/code-examples">
    //         <ListItemIcon>
    //         <CodeIcon />
    //         </ListItemIcon>
    //         <ListItemText primary="Codes" />
    //     </ListItem>
    //     </div>
    // );

    const [status, setStatus] = React.useState(false);
    const handleSnackbarOpen = (type,message) => {
      setStatus({type : type, message : message});
    };
    const handleSnackbarClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setStatus(false);
    };

  return (
    <div className={classes.root}>

      <Snackbar anchorOrigin={{ vertical: 'top', horizontal: 'center'}} open={typeof status === 'object' ? true : false} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={status.type}>
          {status.message}
        </Alert>
      </Snackbar>

      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            PHP Satellite Dashboard
          </Typography>
          <Button
                variant="contained"
                color="inherit"
                className={classes.usernameButton}
                startIcon={<PersonIcon/>}
                disableElevation
          >
              {Username}
          </Button>
          <Button variant="contained" color="secondary" onClick={logOut}>
             Log Out
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
                <Switch>
                    <Route exact path="/console/authentication"><Authentication/></Route>
                    <Route exact path="/console/cloud-datastore"><CloudDatastore/></Route>
                    {/* <Route exact path="/console/documentation"><Documentation/></Route>
                    <Route exact path="/console/code-examples"><CodeExample/></Route> */}
                    <Route exact path="/console"><Dashboard/></Route>
                    <Route component={()=><div>Page not found</div>} />
                </Switch>
          </Grid>
          <Box pt={4}>
            <Footer />
          </Box>
        </Container>
      </main>
    </div>
  );
}

