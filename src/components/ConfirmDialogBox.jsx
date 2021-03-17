import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialogBox = ({openDialog, message, confirmFunction, cancelFunction}) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(()=>{
        setOpen(openDialog);
    },[openDialog]);

    const handleCancelClick = () =>{
        cancelFunction();
        setOpen(false);
    }
    const handleConfirmClick = () =>{
        confirmFunction();
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
                {/* <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent> */}
                <DialogActions>
                    <Button onClick={handleCancelClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmClick} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ConfirmDialogBox
