import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

const CreateDocumentDialogBox = ({openDialog, message, confirmFunction, cancelFunction}) => {
    const [open, setOpen] = React.useState(false);

    const [documentName, setDocumentName] = React.useState("");
    
    React.useEffect(()=>{
        setOpen(openDialog);
    },[openDialog]);

    const handleCancelClick = () =>{
        cancelFunction();
        setDocumentName("");
        setOpen(false);
    }
    const handleConfirmClick = () =>{
        confirmFunction(documentName);
        setDocumentName("");
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
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Document Name"
                        onChange = {e => setDocumentName(e.target.value)}
                        value = {documentName}
                        fullWidth
                    />
                    
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancelClick} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmClick} color="primary" autoFocus>
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CreateDocumentDialogBox
