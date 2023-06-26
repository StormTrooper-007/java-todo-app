import {Button, Paper, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";
import {TodoType} from "../App.tsx";
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';

type props = {
    setId: React.Dispatch<React.SetStateAction<string>>,
    setCancelEdit: React.Dispatch<React.SetStateAction<boolean>>,
    setStatusId: React.Dispatch<React.SetStateAction<string>>,
    setShowStatus: React.Dispatch<React.SetStateAction<boolean>>,
    showStatus: boolean,
    cancelEdit: boolean,
    filter: TodoType,
    deleteTodo: (id: string) => void

}

const paperStyled = {
    padding: 2,
    elevation: 1,
    textAlign: "center",
    margin: 3
}

function Todo({filter, cancelEdit, setId, setCancelEdit, setStatusId, setShowStatus, showStatus, deleteTodo}: props) {

    return (
        <Paper sx={paperStyled}>
            <Typography>Task : {filter.description}</Typography>
            <Typography>Task-Status : {filter.status}</Typography>
            {
                cancelEdit ?
                    <Button variant="contained" startIcon={<BlockIcon/>} onClick={() => {
                        setCancelEdit(prev => !prev)
                        setId("")
                    }}
                            sx={{textTransform: "none", margin: 1}}
                    ></Button>
                    :
                    <Button
                        sx={{margin: 1}}
                        variant="contained"
                        onClick={() => {
                            setId(filter.id.toString())
                            setCancelEdit(prev => !prev)
                        }}>
                        <EditIcon/>
                    </Button>
            }

            {!showStatus ?
                <Button variant="contained" startIcon={<ChangeCircleIcon/>} sx={{textTransform: "none", margin: 1}}
                        onClick={() => {
                            setShowStatus(prev => !prev)
                            setStatusId(filter.id.toString())
                        }
                        }> </Button>
                :
                <Button sx={{margin: 1}} variant="contained" startIcon={<BlockIcon/>}
                        onClick={() => setShowStatus(prev => !prev)}>
                </Button>
            }
            <Button variant="contained" startIcon={<DeleteIcon/>} onClick={() => {
                deleteTodo(filter.id.toString())
                location.reload()
            }} sx={{textTransform: "none", margin: 1}}></Button>
        </Paper>
    );
}

export default Todo;