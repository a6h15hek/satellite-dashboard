import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { getUsersList } from 'Services/admin';
import Title from 'components/Title';
import { Box, Button} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import ConfirmDialogBox from 'components/ConfirmDialogBox';
import { deleteUser } from 'Services/admin';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
    tableHeading : {
        fontWeight : 800
    },
    marginHorizontal :{
        marginRight : 10,
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


const UsersTable = () => {
    const classes = useStyles();
    const [status, setStatus] = React.useState("");
    const [currentPage, setCurrentPage] = React.useState(1);
    const [totalPage, setTotalPage] = React.useState(0);
    const [usersList, setUsersList] = React.useState([]);

    const [dialogBox, setDialogBox] = React.useState(false);

    const total_users_in_column = 11;
    const handleRefreshUserList = () =>{
        getUsersList((currentPage-1)*total_users_in_column , currentPage*total_users_in_column, ()=>{
                //wait
                setStatus("Loading...");
            },response => {
                if(response.success){
                    setStatus("List Refreshed.");
                    setTotalPage(Math.ceil(response.total_user/total_users_in_column));
                    setUsersList(response.users);
                }
            })
    }

    React.useEffect(()=>{
        //1- 0-11
        //2- 11-22
        //3- 22-33
        getUsersList( (currentPage-1)*total_users_in_column , currentPage*total_users_in_column, ()=>{
            //wait
            setStatus("Loading...");
        },response => {
            if(response.success){
                setStatus("");
                setTotalPage(Math.ceil(response.total_user/total_users_in_column));
                setUsersList(response.users);
            }else{
                setStatus("Users not found.");
            }
        })
    },[currentPage]);

    //to change the user list page
    const handlePageChange = (event, value) =>{
        setCurrentPage(value);
    } 

    //handle confirm delete page
    const handleConfirmDelete = (user_id) =>{
        deleteUser(user_id,()=>{
            //wait
            setStatus("Loading...");
        },response=>{
            setStatus(response.message);
        })
        setDialogBox(false);
        handleRefreshUserList();
    }
    return (
        <React.Fragment>
            <ConfirmDialogBox openDialog={typeof dialogBox === 'object' ? true : false} message={dialogBox.message} cancelFunction={dialogBox.cancelFunction} confirmFunction={dialogBox.confirmFunction} />
            <Box flexDirection="row" alignItems="center">
                <Title>Users</Title>
                <Pagination color="primary"  style={{display:'inline-block'}} onChange={handlePageChange} count={totalPage} />
                <Button className={classes.marginHorizontal} onClick={handleRefreshUserList} variant="contained" color="primary">Refresh</Button>
                {status}
            </Box>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell align="left" className={classes.tableHeading}>Email</TableCell>
                            <TableCell align="left" className={classes.tableHeading}>Name</TableCell>
                            <TableCell align="left" className={classes.tableHeading}>UserId</TableCell>
                            <TableCell align="left" className={classes.tableHeading}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {usersList.map((usersList) => (
                            <TableRow key={usersList.user_id}>
                                <TableCell align="left">{usersList.email}</TableCell>
                                <TableCell align="left">{usersList.firstname + " " + usersList.lastname}</TableCell>
                                <TableCell align="left">{usersList.user_id}</TableCell>
                                <TableCell align="left">
                                    <Button variant="contained" color="secondary" onClick={()=>setDialogBox({message : "Are you sure to delete user with id "+usersList.user_id +" ?", cancelFunction : ()=>setDialogBox(false), confirmFunction : ()=>handleConfirmDelete(usersList.user_id)})}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </React.Fragment>
    )
}

export default UsersTable
