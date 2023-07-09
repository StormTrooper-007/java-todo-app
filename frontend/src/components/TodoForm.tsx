import {Button, Grid, TextField} from "@mui/material";
import {FormEvent, SetStateAction, useEffect, useRef} from "react";
import {Item} from "../Utils.tsx";
import {useAddTodoMutation} from "../features/api/apiSlice.tsx";

type props = {
    id: string,
    isEdit: boolean,
    setIsEdit: React.Dispatch<SetStateAction<boolean>>
    description: string
    setDescription: React.Dispatch<SetStateAction<string>>
}


function TodoForm({id, isEdit, setIsEdit, setDescription, description}: props) {

    const todoRef = useRef("" as any);

    useEffect(() => {
        if (id !== "") {
            setIsEdit(true);
            todoRef.current.focus();
        } else {
            setIsEdit(false);
        }
    }, [isEdit, id]);

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        await addContact({description, status: "OPEN"})
        setDescription("")
    }

    const [addContact] = useAddTodoMutation();
    return (
        <Grid item xs={6} sx={{ml: 2}}>
            <Item>
                <form onSubmit={handleSubmit} style={{display: "flex", alignItems: "center"}}>
                    <TextField inputRef={todoRef as any} value={description}
                               onChange={(event) => setDescription(event.target.value)} sx={{margin: 2}}/>
                    <Button variant="contained" type="submit" sx={{ml: 5}}>Save todo</Button>
                </form>
            </Item>
        </Grid>
    );
}

export default TodoForm;