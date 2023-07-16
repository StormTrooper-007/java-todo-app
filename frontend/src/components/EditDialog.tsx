import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {usePatchTodoMutation} from "../features/api/apiSlice.tsx";
import {Status, TodoType} from "../Utils.tsx";


type props = {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    open: boolean
    setId: React.Dispatch<React.SetStateAction<string>>
    id: string
    todoObj: TodoType
    description: string

}


function EditDialog({setOpen, open, setIsEdit, setId, id}: props) {
    const [patchTodo] = usePatchTodoMutation()
    const [status, setStatus] = useState<Status>(0)


    const handleClose = () => {
        setOpen(false)
        setIsEdit(false)
        setId("")
    };

    const handleStatusChange = (event: SelectChangeEvent<typeof status>) => {
        const {value} = event.target
        setStatus(value as Status)
    };

    async function handleStatusUpdate(todo: { id: string, status: Status }) {
        await patchTodo(todo)
        handleClose()
        console.log(status)
    }


    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Change todo Status</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        change your todo status
                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <FormControl sx={{mt: 2, minWidth: 120}}>
                            <InputLabel htmlFor="Status">Status</InputLabel>
                            <Select
                                autoFocus
                                value={status}
                                onChange={handleStatusChange}
                                label="Status"
                                inputProps={{
                                    name: 'Status',
                                    id: 'Status'
                                }}
                            >
                                <MenuItem value={0}>Open</MenuItem>
                                <MenuItem value={1}>Doing</MenuItem>
                                <MenuItem value={2}>Done</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleStatusUpdate({id, status})}
                            variant="contained" sx={{textTransform: "none"}}>update status</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>

    );
}

export default EditDialog;