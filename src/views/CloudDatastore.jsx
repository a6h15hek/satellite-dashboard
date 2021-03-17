import React from 'react'
import clsx from 'clsx';
import { Grid, makeStyles, Paper } from '@material-ui/core'
import CollectionTable from 'components/Datastore/CollectionTable';
import DocumentTable from 'components/Datastore/DocumentTable';
import DataObjectEditor from 'components/Datastore/DataObjectEditor';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
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
    fixedHeightCode: {
        height: 660,
    },
    fixedHeightCollection: {
        height: 230,
    },
    fixedHeightDocument: {
        height: 375,
    },
    fixedHeightTitle: {
        height: 39,
    },
}));
const CloudDatastore = () => {
    const classes = useStyles();
    const [collection, setCollection] = React.useState("");
    const [document, setDocument] = React.useState("");
    const fixedHeightCodeLayout = clsx(classes.paper, classes.fixedHeightCode);

    React.useEffect(()=>{
      setDocument("");
    },[collection])
    return (
        <React.Fragment>
            <Grid item xs={12} md={3} lg={3}>
              <Paper className={fixedHeightCodeLayout}>
                <CollectionTable collection_name={collection} setCollection={setCollection}/>
              </Paper>
            </Grid>
            <Grid item xs={12} md={3} lg={3}>
              <Paper className={fixedHeightCodeLayout}>
                <DocumentTable collection_name={collection} setDocumentName={setDocument} document_name={document} />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Paper className={fixedHeightCodeLayout}>
                <DataObjectEditor collection_name={collection} document_name={document}/>
              </Paper>
            </Grid>
        </React.Fragment>
    )
}

export default CloudDatastore;
