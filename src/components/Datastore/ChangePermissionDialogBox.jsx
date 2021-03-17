import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import { MenuItem } from '@material-ui/core';

const ConfirmDialogBox = ({openDialog, message, confirmFunction, cancelFunction, read, write}) => {
    const [open, setOpen] = React.useState(false);

    //form inputs
    const [newWrite, setNewWrite] = React.useState("private");
    const [newRead, setNewRead] = React.useState("private");

    React.useEffect(()=>{
        setOpen(openDialog);
    },[openDialog]);

    const handleCancelClick = () =>{
        cancelFunction();
        setOpen(false);
    }
    const handleConfirmClick = () =>{
        confirmFunction(newRead, newWrite);
        setOpen(false);
    }
    const handleClose = () =>{
        setOpen(false);
    }
    return (
        <div>
            <Dialog
                open= {open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <b>read : </b>{read} &nbsp;&nbsp; <b>write : </b>{write}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        select
                        margin="dense"
                        id="name"
                        label="Read Permission"
                        onChange = {e => setNewRead(e.target.value)}
                        value = {newRead}
                        fullWidth
                    >
                        <MenuItem value="private">private</MenuItem>
                        <MenuItem value="public">public</MenuItem>
                    </TextField>
                    <TextField
                        select
                        margin="dense"
                        id="name"
                        label="Write Permission"
                        onChange = {e => setNewWrite(e.target.value)}
                        value = {newWrite}
                        fullWidth
                    >
                        <MenuItem value="private">private</MenuItem>
                        <MenuItem value="public">public</MenuItem>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmClick} color="primary" autoFocus>
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmDialogBox
