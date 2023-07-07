import {Box, Grid} from "@mui/material";
import {TodoType} from "../Utils.tsx";
import TodoCard from "./TodoCard.tsx";
import * as React from "react";
import {useTodosQuery} from "../features/api/apiSlice.tsx";


type props = {
    handleClickOpen: (id: string) => void
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    setTodoObj: React.Dispatch<React.SetStateAction<TodoType>>
}

function TodosContainer({handleClickOpen, setIsEdit, setTodoObj}: props) {
    const {data} = useTodosQuery()

    return (
        <Box sx={{flexGrow: 1, mt: 2, ml: 3}}>
            <Grid container spacing={{xs: 2, md: 3}} columns={{xs: 4, sm: 8, md: 12}}>
                {data?.map((todo: TodoType) => (
                    <TodoCard todo={todo} setTodoObj={setTodoObj} handleClickOpen={handleClickOpen} key={todo.id}
                              setIsEdit={setIsEdit}/>
                ))}
            </Grid>
        </Box>
    );
}

export default TodosContainer;