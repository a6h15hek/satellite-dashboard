import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Title from 'components/Title';
import { Box, Button} from '@material-ui/core';
import ConfirmDialogBox from 'components/ConfirmDialogBox';
import { getClientList } from 'Services/client';
import { Alert } from '@material-ui/lab';
import { deleteClient } from 'Services/client';
import { generateSecretKey } from 'Services/client';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tableHeading : {
        fontWeight : 800
    },
    marginHorizontal :{
        marginRight : 0,
        marginLeft : 10
    },
    changePageBox : {
        marginRight : 10,
        marginLeft : 10
    },
    pageCounter : {
        marginRight : 8,
        marginLeft : 8,
        fontWeight : 700
    }

});



const ClientList = ({setGeneratedToken}) => {
    const classes = useStyles();
    const [dialogBox, setDialogBox] = React.useState(false);
    const [status, setStatus] = React.useState(false);
    const [clientList, setClientList] = React.useState([]);

    React.useEffect(()=>{
        getClientList(()=>{
            setStatus({
                type : "info",
                message : "Loading..."
            });
        },response=>{
            if(response.success){
                setClientList(response.data);
                setStatus(false);
              }else{
                setStatus({
                  type : "error",
                  message : "Error : "+response.message
                })
            }
        });
    },[]);

    const handleRefreshClientList = () =>{
        getClientList(()=>{
            setStatus({
                type : "info",
                message : "Loading..."
            });
        },response=>{
            if(response.success){
                setClientList(response.data);
                setStatus(false);
              }else{
                setClientList([]);
                setStatus({
                  type : "error",
                  message : "Error : "+response.message
                })
            }
        });
    }
    
    const handleConfirmDelete = (client_id) =>{
        deleteClient(client_id, ()=>{
            setStatus({
                type : "info",
                message : "Loading..."
            });
        },response=>{
            if(response.success){
                setStatus({
                    type : "error",
                    message : "Success : "+response.message
                });
                handleRefreshClientList();
              }else{
                setStatus({
                  type : "error",
                  message : "Error : "+response.message
                })
            }
        });
        setDialogBox(false);
    }
    
    const handleGenerateSecretToken = (client_id) =>{
        generateSecretKey(client_id, ()=>{
            setStatus({
                type : "info",
                message : "Loading..."
            });
        },response=>{
            if(response.success){
                setStatus({
                    type : "error",
                    message : "Success : "+response.message
                });
                setGeneratedToken(response.token);
                handleRefreshClientList();
              }else{
                setStatus({
                  type : "error",
                  message : "Error : "+response.message
                })
            }
        });
    }

    return (
        <React.Fragment>
            {status ? <Alert severity={status.type} >{status.message}</Alert> : ""}
            <ConfirmDialogBox openDialog={typeof dialogBox === 'object' ? true : false} message={dialogBox.message} cancelFunction={dialogBox.cancelFunction} confirmFunction={dialogBox.confirmFunction} />
            <Box flexDirection="row" alignItems="center">
                <Title>Clients</Title>
                <Button className={classes.marginHorizontal} size="small" onClick={handleRefreshClientList} variant="contained" color="primary">Refresh</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell align="left" className={classes.tableHeading}>App Name</TableCell>
                            <TableCell align="left" className={classes.tableHeading}>Client ID</TableCell>
                            <TableCell align="left" className={classes.tableHeading}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {clientList.map((client) => (
                            <TableRow key={client.client_id}>
                                <TableCell align="left">{client.app_name}</TableCell>
                                <TableCell align="left">{client.client_id}</TableCell>
                                <TableCell align="left">
                                    <Button className={classes.marginHorizontal} size="small" variant="contained" color="primary"
                                        onClick={()=>handleGenerateSecretToken(client.client_id)}
                                    >
                                        Generate Token
                                    </Button>
                                    <Button className={classes.marginHorizontal} size="small" variant="contained" color="secondary"
                                        onClick={()=>setDialogBox({message : "Are you sure to delete client with app_name "+client.app_name+" ?", cancelFunction : ()=>setDialogBox(false), confirmFunction : ()=>handleConfirmDelete(client.client_id)})}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default ClientList
