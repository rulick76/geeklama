
import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button, TextField } from '@mui/material';
import Rate from '@mui/material/Rating';
import Comment from '../models/comment';

interface Props {
    isOpen: boolean
    onClose: (comment: Comment) => void
}

export default function CommentDialog({ isOpen, onClose }: Props) {

    const [title, setTitle] = React.useState('');
    const [date, setDate] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [rate, setRate] = React.useState(0);

    const handleClose = () => {
        var comment = {
            date: date,
            title: title,
            case: description,
            rate: rate
        }
        onClose(comment);
    };

    return (
        <>
            <Dialog open={isOpen} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Case</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send updates
                        occasionally.
                    </DialogContentText>
                    <TextField id="title" name="title" label="Job Title" variant="standard" onChange={(e) => setTitle(e.target.value)} />
                    <TextField id="date" name="date" label="Date" variant="standard" onChange={(e) => setDate(e.target.value)} />
                    <TextField id="case" name="case" label="Case" variant="standard" onChange={(e) => setDescription(e.target.value)} />
                    <Rate defaultValue={2.5} precision={0.5}></Rate>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

