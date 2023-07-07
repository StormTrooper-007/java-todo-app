import {Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material";
import {TodoType} from "../Utils.tsx";
import {useDeleteTodoMutation} from "../features/api/apiSlice.tsx";
import * as React from "react";


type props = {
    todo: TodoType,
    handleClickOpen: (id: string) => void,
    setIsEdit: React.Dispatch<React.SetStateAction<boolean>>
    setTodoObj: React.Dispatch<React.SetStateAction<TodoType>>
}

function TodoCard({todo, handleClickOpen, setTodoObj}: props) {
    const [deleteTodo] = useDeleteTodoMutation()


    async function handleDelete() {
        await deleteTodo(todo.id)
    }

    return (
        <Grid item xs={2} sm={4} md={4} sx={{margin: 1}}>
            <Card>
                <CardContent>
                    <Typography>Todo: {todo.description}</Typography>
                    <Typography>Status: {todo.status}</Typography>
                </CardContent>
                <CardContent sx={{display: "flex"}}>
                    <CardActions><Button
                        onClick={() => {
                            handleClickOpen(todo.id)
                            setTodoObj(todo)
                        }}
                        variant="contained" sx={{textTransform: "none"}}>change status</Button></CardActions>
                    <CardActions><Button variant="contained" sx={{textTransform: "none"}}>edit</Button></CardActions>
                    <CardActions><Button
                        onClick={handleDelete}
                        variant="contained" sx={{textTransform: "none"}}>delete</Button></CardActions>
                </CardContent>
            </Card>
        </Grid>
    );
}

export default TodoCard;