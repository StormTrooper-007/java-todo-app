import {Button, Paper} from "@mui/material";
import SelectStatus from "./SelectStatus.tsx";
import React from "react";

type props = {
    status: string
    setStatus: React.Dispatch<React.SetStateAction<string>>
    statusId: string
    patchTodo: (status: string, id: string) => void
}


export default function Dialog({status, setStatus, statusId, patchTodo}: props) {

    return (
        <Paper sx={{padding: 10, ml: 28, mt: 5}}>
            <SelectStatus
                status={status}
                setStatus={setStatus}
            />
            <Button onClick={() => {
                patchTodo(status, statusId)
                location.reload()
            }}> update </Button>
        </Paper>
    )
}