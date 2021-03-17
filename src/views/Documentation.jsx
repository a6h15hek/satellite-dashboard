import React from 'react'
import clsx from 'clsx';
import { Grid, makeStyles, Paper } from '@material-ui/core'
import Title from 'components/Title';

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
    fixedHeightMainLayout: {
        height: 610,
    },
    fixedHeightTitle: {
        height: 39,
    },
}));
const Documentation = () => {
    const classes = useStyles();
    const fixedHeightTitle= clsx(classes.paperTitle, classes.fixedHeightTitle);
    const fixedHeightMainLayout = clsx(classes.paper, classes.fixedHeightMainLayout);
    return (
        <React.Fragment>
            <Grid item xs={12}>
                <Paper className={fixedHeightTitle} >
                    <Title>Documentation</Title>
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper className={fixedHeightMainLayout}>

                </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default Documentation;
