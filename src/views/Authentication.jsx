import React from 'react'
import clsx from 'clsx';
import { Grid, makeStyles, Paper } from '@material-ui/core'
import Title from 'components/Title';
import UsersTable from 'components/UserAuthentication/UsersTable';
import CreateUserForm from 'components/CreateUserForm';

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
    fixedHeightUserList: {
        height: 660,
    },
    fixedHeightStat: {
        height: 170,
    },
    fixedHeightCreateLayout: {
        height: 435,
    },
    fixedHeightTitle: {
        height: 39,
    },
}));
const Authentication = () => {
    const classes = useStyles();
    const fixedHeightTitle= clsx(classes.paperTitle, classes.fixedHeightTitle);
    const fixedHeightUserLayout = clsx(classes.paper, classes.fixedHeightUserList);
    const fixedHeightStatLayout = clsx(classes.paper, classes.fixedHeightStat);
    const fixedHeightCreateUserLayout = clsx(classes.paper, classes.fixedHeightCreateLayout);
    return (
        <React.Fragment>
            <Grid item xs={12} md={5} lg={4}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightTitle} >
                            <Title>Authentication</Title>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightStatLayout}>
                            <Title>Stat</Title>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={fixedHeightCreateUserLayout}>
                            <Title>Create User</Title>
                            <CreateUserForm />
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
              <Paper className={fixedHeightUserLayout}>
                <UsersTable />
              </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default Authentication;
