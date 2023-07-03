import {Grid, Typography} from "@mui/material";
import {Item} from "../Utils.tsx";


function AppHeader() {
    return (
        <Grid item xs={12}>
            <Item sx={{padding: 4}}>
                <Typography variant="h4" gutterBottom>Todo App</Typography>
            </Item>
        </Grid>
    );
}

export default AppHeader;