import {Chip, Stack} from "@mui/material";


function TodoChips() {
    return (
        <Stack direction="row" spacing={2} sx={{margin: 2, display: "flex", justifyContent: "center"}}>
            <Chip label="Open todos" variant="outlined"/>
            <Chip label="Doing todos" variant="outlined"/>
            <Chip label="Done todos" variant="outlined"/>
        </Stack>
    );
}

export default TodoChips;