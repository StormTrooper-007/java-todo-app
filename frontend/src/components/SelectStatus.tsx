import {Box, Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select} from "@mui/material";
import React, {useState} from "react";
import {TodoType} from "../App.tsx";


type props = {
    status:string
    setStatus:React.Dispatch<React.SetStateAction<string>>
    showStatus:boolean
    setShowStatus:React.Dispatch<React.SetStateAction<boolean>>
    setTodoo:React.Dispatch<React.SetStateAction<any>>
    todoo:any
    editTodo:(status:string, id:string, desc:string) => void
    todos:TodoType[]
    desc:string
    id:string

}



export default function SelectStatus({ todos, desc,id,status,setStatus,editStatus, showStatus,setShowStatus, setTodoo, todoo, patchTodo}:props){

    return(
     <Box>
         <FormControl fullWidth>
             <InputLabel id="demo-simple-select-label">Status</InputLabel>
             <Select
                 value={status}
                 label="status"
                 onChange={(event) => {
                     setStatus(event.target.value)
                 }}
             >
                 <MenuItem value="OPEN">OPEN</MenuItem>
                 <MenuItem value="DOING">DOING</MenuItem>
                 <MenuItem value="DONE">DONE</MenuItem>
             </Select>
         </FormControl>

     </Box>
    )
}