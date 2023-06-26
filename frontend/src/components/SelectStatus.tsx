import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import React from "react"


type props = {
    status: string
    setStatus: React.Dispatch<React.SetStateAction<string>>
}


export default function SelectStatus({status, setStatus}: props) {

    return (
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