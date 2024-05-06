import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

interface Props {
    informationText: string,
    yesFunction: () => void,
    noFunction?: () => void,
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
}


export default function AlertDialog({informationText, yesFunction, noFunction, open, setOpen}: Props) {
    const handleClickYes = () => {
        yesFunction();
        handleClose();
    }

    const handleClickNo = () => {
        if (noFunction) noFunction();
        handleClose();
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {informationText}
                </DialogTitle>
                {/*<DialogContent>*/}
                {/*    <DialogContentText id="alert-dialog-description">*/}
                {/*        Let Google help apps determine location. This means sending anonymous*/}
                {/*        location data to Google, even when no apps are running.*/}
                {/*    </DialogContentText>*/}
                {/*</DialogContent>*/}
                <DialogActions>
                    <Button onClick={handleClickNo} autoFocus>NÃO</Button>
                    <Button onClick={handleClickYes}>
                        SIM
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
