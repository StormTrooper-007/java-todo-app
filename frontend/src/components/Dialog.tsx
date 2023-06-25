import {Button, FormControl, InputLabel, MenuItem, Paper, Select} from "@mui/material";
import SelectStatus from "./SelectStatus.tsx";
import React from "react";
import {TodoType} from "../App.tsx";

type props = {
    status:string
    setStatus:React.Dispatch<React.SetStateAction<string>>
    todo:TodoType
    showStatus:boolean
    setShowStatus:React.Dispatch<React.SetStateAction<boolean>>
    setTodoo:React.Dispatch<React.SetStateAction<any>>
    todoo:any
    desc:string
    statusId:string
    editTodo:(statusId:string, desc:string, status:string) => void
}


export default function Dialog({todos,
                                   status,setStatus,
                                   todo, showStatus,
                                   setShowStatus,
                                   setTodoo,
                                   desc,
                                   todoo,
                                editTodo,
                                 statusId,
    id
                               }:props){
    console.log(statusId)

    return(
        <Paper sx={{padding:10, ml:28, mt:5}}>
            <SelectStatus
                setShowStatus={setShowStatus}
                showStatus={showStatus}
                status={status}
                setStatus={setStatus}
                setTodoo={setTodoo}
                todoo={todoo}
                todos={todos}
                desc={desc}
            ></SelectStatus>
            <Button onClick={() => editTodo(statusId, desc, status)}> update </Button>
        </Paper>
    )
}