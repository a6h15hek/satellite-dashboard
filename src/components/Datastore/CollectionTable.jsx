import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from 'components/Title';
import Pagination from '@material-ui/lab/Pagination';
import { getCollections } from 'Services/Datastore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ConfirmDialogBox from 'components/ConfirmDialogBox';
import { deleteCollection } from 'Services/Datastore';
import ChangePermissionDialogBox from 'components/Datastore/ChangePermissionDialogBox';
import CreateCollectionDialogBox from 'components/Datastore/CreateCollectionDialogBox';
import { createCollection } from 'Services/Datastore';
import { updateCollectionPermissions } from 'Services/Datastore';


const useStyles = makeStyles({
    table: {
    },
    tableHeading : {
        fontWeight : 800
    },
    margin :{
        margin : 2
    },
    marginVertical :{
        marginTop : 10,
        marginBottom : 10
    },
    collectionName : {
        fontWeight : 700,
        cursor : 'pointer',
        "&:hover": {
            color : '#1976d2'
        },
    },
    selectedCollectionName : {
        fontWeight : 700,
        cursor : 'pointer',
        color : '#1976d2'
    },
    collectionColumn : {
        width : 90,
        maxWidth : 120,
        padding : 5
    },
    permissionsColumn : {
        width : 75,
        maxWidth : 75,
        padding : 5
    },
    actionColumn : {
        width : 10,
        maxWidth : 15,
        padding : 2
    },
    permissionText : {
        cursor : 'pointer',
        "&:hover": {
            color : '#ff9800'
        },
    },
    actionButtonDelete : {
        cursor : 'pointer',
        "&:hover": {
            color : '#f44336'
        }
    }
});


const CollectionTable = ({collection_name, setCollection}) => {
    const classes = useStyles();
    const [status, setStatus] = React.useState("");
    const [collectionList, setCollectionList] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);

    
    //dialog box state
    const [confirmDialogBox, setConfirmDialogBox] = React.useState(false);
    const [changePermissionDialogBox, setChangePermissionDialogBox] = React.useState(false);
    const [createCollectionDialogBox, setCreateCollectionDialogBox] = React.useState(false);

    const total_element_in_column = 16;

    const handleRefreshListButton = (message="") =>{
        getCollections((currentPage-1)*total_element_in_column , currentPage*total_element_in_column,()=>{
            setStatus("Loading...");
        }, response => {
            if(response.success){
                setStatus(message+" List Refreshed.");
                setTotalPage(Math.ceil(response.total_collections/total_element_in_column));
                setCollectionList(response.data) ;
            }else{
                setCollectionList([]) ;
                setStatus(response.message);
            }
        });
    }
    React.useEffect(()=>{
        getCollections((currentPage-1)*total_element_in_column , currentPage*total_element_in_column,()=>{
            setStatus("Loading...");
        }, response => {
            if(response.success){
                setStatus("");
                setTotalPage(Math.ceil(response.total_collections/total_element_in_column));
                setCollectionList(response.data) ;
            }else{
                setCollectionList([]) ;
                setStatus(response.message);
            }
        });
    },[currentPage]);

     //to change the collection list page
     const handlePageChange = (event, value) =>{
        setCurrentPage(value);
    } 

    const handleDeleteCollection = (collection_name) =>{
        deleteCollection(collection_name,()=>{
            //wait
            setStatus("Loading...");
        },response=>{
            handleRefreshListButton(response.message);   
        })
        setConfirmDialogBox(false);
    }

    const handleChangePermission = (collection_name, read_per, write_per) =>{
        updateCollectionPermissions(collection_name, read_per, write_per, ()=>{
            setStatus("Loading...");
        }, response => {
            handleRefreshListButton(response.message);
        });
        setChangePermissionDialogBox(false)
    }
     
    const handleCreateCollection = (collection_name, read_per, write_per) =>{
        createCollection(collection_name, read_per, write_per, ()=>{
            setStatus("Loading...");
        }, response => {
            handleRefreshListButton(response.message);
        });
        setCreateCollectionDialogBox(false);
    }
    return (
        <React.Fragment>
            <ConfirmDialogBox openDialog={typeof confirmDialogBox === 'object' ? true : false} message={confirmDialogBox.message} cancelFunction={confirmDialogBox.cancelFunction} confirmFunction={confirmDialogBox.confirmFunction} />
            <CreateCollectionDialogBox openDialog={typeof createCollectionDialogBox === 'object' ? true : false} message={createCollectionDialogBox.message} cancelFunction={createCollectionDialogBox.cancelFunction} confirmFunction={createCollectionDialogBox.confirmFunction} />
            <ChangePermissionDialogBox openDialog={typeof changePermissionDialogBox === 'object' ? true : false} message={changePermissionDialogBox.message} read={changePermissionDialogBox.read_per} write={changePermissionDialogBox.write_per} cancelFunction={changePermissionDialogBox.cancelFunction} confirmFunction={changePermissionDialogBox.confirmFunction} />

             <Box flexDirection="row" alignItems="center">
                <Title className={classes.margin}>Collection</Title>
                <Box flexDirection="row" alignItems="center">
                    <Button className={classes.margin} size="small" variant="contained" onClick={handleRefreshListButton} color="primary">Refresh</Button>
                    <Button className={classes.margin} size="small" variant="contained" style={{backgroundColor : '#4caf50'}}
                            onClick ={()=>setCreateCollectionDialogBox({
                                message : "Create Collection ", 
                                cancelFunction : ()=>setCreateCollectionDialogBox(false), 
                                confirmFunction : (collectionName,read_per,write_per)=>handleCreateCollection(collectionName, read_per, write_per)
                            })}
                    >Create</Button>
                </Box>
                <Pagination color="primary"  style={{display:'inline-block'}} onChange={handlePageChange} count={totalPage} />
                {status}
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell padding='none' align="left" className={clsx(classes.tableHeading, classes.collectionColumn)}>Name</TableCell>
                            <TableCell padding='none' align="left" className={clsx(classes.tableHeading,classes.permissionsColumn)}>Read, Write</TableCell>
                            <TableCell padding='none' align="left" className={clsx(classes.tableHeading,classes.actionColumn)}>A</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {collectionList.map((collectionList,key) => (
                            <TableRow  key={key}>
                                <TableCell padding='none' align="left" style={{display : 'inline-flex'}} className={classes.collectionColumn}><div className={collection_name === collectionList.collectionName ? classes.selectedCollectionName :classes.collectionName} onClick={()=>setCollection(collectionList.collectionName)} >{collectionList.collectionName}</div></TableCell>
                                <TableCell padding='none' align="left" className={classes.permissionsColumn}>
                                    <div className={classes.permissionText}
                                         onClick={()=>setChangePermissionDialogBox({
                                            message : "Change Permission of Collection \"" +collectionList.collectionName+"\" ", 
                                            read_per : collectionList.read,
                                            write_per : collectionList.write,
                                            cancelFunction : ()=>setChangePermissionDialogBox(false), 
                                            confirmFunction : (read_per,write_per)=>handleChangePermission(collectionList.collectionName, read_per, write_per)
                                         })} 
                                    >
                                        {collectionList.read}, {collectionList.write}
                                    </div> 
                                </TableCell>
                                <TableCell padding='none' align="left" className={classes.actionColumn}>
                                    <div className={classes.actionButtonDelete}>
                                        <DeleteForeverIcon onClick={()=>setConfirmDialogBox({message : "Are you sure to delete Collection with name "+collectionList.collectionName +" ?", cancelFunction : ()=>setConfirmDialogBox(false), confirmFunction : ()=>handleDeleteCollection(collectionList.collectionName)})} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default CollectionTable
