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
import ConfirmDialogBox from 'components/ConfirmDialogBox';
import CreateDocumentDialogBox from 'components/Datastore/CreateDocumentDialogBox';
import { getDocumentNameArray } from 'Services/Datastore';
import { deleteDocument } from 'Services/Datastore';
import { setDocument } from 'Services/Datastore';
import { addDocument } from 'Services/Datastore';

const useStyles = makeStyles({
    table: {
        minWidth: 270,
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
    documentNameColumn : {
        width : 100,
        maxWidth : 130,
        padding : 5
    },
    actionColumn : {
        width : 10,
        maxWidth : 40,
        padding : 5
    },
    deleteTextButton : {
        color : 'red',
        cursor : 'pointer'
    },
    documentTextButton : {
        cursor : 'pointer',
        "&:hover": {
            color : '#1976d2'
        },
    },
    selectedDocumentTextButton : {
        cursor : 'pointer',
        color : '#1976d2'
    }
});


const DocumentTable = ({collection_name, setDocumentName, document_name}) => {
    const classes = useStyles();
    const [status, setStatus] = React.useState("");
    const [documentList, setdocumentList] = React.useState([]);

    //page control states
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);

    //dialog box state
    const [confirmDialogBox, setConfirmDialogBox] = React.useState(false);
    const [createDocumentDialogBox, setCreateDocumentDialogBox] = React.useState(false);

    const total_element_in_column = 15;

    const handleRefreshListButton = (message="") =>{
        if(collection_name !== ""){
            getDocumentNameArray(collection_name, (currentPage-1)*total_element_in_column , currentPage*total_element_in_column, ()=>{
                setStatus("Loading...");
            }, response=>{
                if(response.success){
                    setTotalPage(Math.ceil(response.total_documents/total_element_in_column));
                    setdocumentList(response.data) ;
                    setStatus(message+" List Refreshed.");
                }else{
                    setdocumentList([]);
                    setStatus(response.message);
                }
            });
        }
    }

    React.useEffect(()=>{
        if(collection_name !== ""){
            getDocumentNameArray(collection_name, (currentPage-1)*total_element_in_column , currentPage*total_element_in_column, ()=>{
                setStatus("Loading...");
            }, response=>{
                if(response.success){
                    setStatus("");
                    setTotalPage(Math.ceil(response.total_documents/total_element_in_column));
                    setdocumentList(response.data) ;
                }else{
                    setdocumentList([]);
                    setStatus(response.message);
                }
            });
        }
    },[currentPage, collection_name]);

    //to change the document list page
    const handlePageChange = (event, value) =>{
        setCurrentPage(value);
    } 

    const handleDeleteDocument = (document_name) =>{
        deleteDocument(collection_name, document_name, ()=>{
            //wait
            setStatus("Loading...");
        }, response => {
            if(response.success){
                setDocumentName("");
                handleRefreshListButton(response.message);  
            } 
        });
        setConfirmDialogBox(false);
    }

    const handleCreateDocument = (document_name) =>{
        if(collection_name !== ""){
            setDocument(collection_name, document_name, {}, true, ()=>{
                //wait
                setStatus("Loading...");
            },response => {
                if(response.success){
                    handleRefreshListButton(response.message); 
                    setDocumentName(document_name);
                }
            })
        }else{
            setStatus("Collection not selected.");
        }
        
        setCreateDocumentDialogBox(false);
    }

    const handleAddDocument = () =>{
        if(collection_name !== ""){
            addDocument(collection_name, {}, ()=>{
                //wait
                setStatus("Loading...");
            },response => {
                if(response.success){
                    handleRefreshListButton(response.message); 
                    setDocumentName(response.document_name);
                }
            });
        }else{
            setStatus("Collection not selected.");
        }   
    }

    return (
        <div>
            <ConfirmDialogBox openDialog={typeof confirmDialogBox === 'object' ? true : false} message={confirmDialogBox.message} cancelFunction={confirmDialogBox.cancelFunction} confirmFunction={confirmDialogBox.confirmFunction} />
            <CreateDocumentDialogBox openDialog={typeof createDocumentDialogBox === 'object' ? true : false} message={createDocumentDialogBox.message} cancelFunction={createDocumentDialogBox.cancelFunction} confirmFunction={createDocumentDialogBox.confirmFunction} />
             <Box flexDirection="row" alignItems="center">
                <Title className={classes.margin}>Documents</Title>
                <Box flexDirection="row" alignItems="center">
                    <Button className={classes.margin} size="small" variant="contained" color="primary" onClick={handleRefreshListButton}>Refresh</Button>
                    <Button className={classes.margin} size="small" variant="contained" style={{backgroundColor : '#4caf50'}}
                            onClick ={()=>setCreateDocumentDialogBox({
                                message : "Create Document ", 
                                cancelFunction : ()=>setCreateDocumentDialogBox(false), 
                                confirmFunction : (document_name)=>handleCreateDocument(document_name)
                            })}
                    >
                        Create
                    </Button>
                    <Button className={classes.margin} size="small" variant="contained" style={{backgroundColor : '#ff9100'}} onClick={handleAddDocument}>Add</Button>
                </Box>
                <Pagination className={classes.marginVertical} style={{display:'inline-block'}} color="primary" onChange={handlePageChange} count={totalPage} />
                {status}
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell align="left" className={clsx(classes.tableHeading,classes.documentNameColumn)}>Name</TableCell>
                            <TableCell align="left" className={classes.actionColumn}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documentList.map((document) => (
                            <TableRow key={document}>
                                <TableCell className={clsx(classes.tableHeading,classes.documentNameColumn)} align="left">
                                    <div className={document_name === document ? classes.selectedDocumentTextButton : classes.documentTextButton} onClick={()=>setDocumentName(document)} >{document}</div>
                                </TableCell>
                                <TableCell className={classes.actionColumn} align="left">
                                   <div className={classes.deleteTextButton}
                                        onClick={()=>setConfirmDialogBox({
                                            message : "Are you sure to delete Document with name \""+document +"\" ?", 
                                            cancelFunction : ()=>setConfirmDialogBox(false), 
                                            confirmFunction : ()=>handleDeleteDocument(document)
                                        })}
                                   >Delete</div> 
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default DocumentTable;
