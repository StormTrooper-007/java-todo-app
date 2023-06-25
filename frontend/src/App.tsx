
import {
  Box,

  Button, Chip, FormControl,
  Grid, InputLabel, MenuItem,
  Paper, Select,
  Stack,
  TextField, Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import EditIcon from "@mui/icons-material/Edit";
import SelectStatus from "./components/SelectStatus.tsx";
import Dialog from "./components/Dialog.tsx";


export type TodoType = {
  id:number,
  description:string,
  status:string
}

function App() {




  const [desc, setDesc] = useState<string>("");
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [id, setId] = useState<string>("");
  const [statusId, setStatusId] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const [status, setStatus] = useState<string>("OPEN");
  const todoRef = useRef("" as any);
  const [showStatus, setShowStatus] = useState<boolean>(false);
  const [todoo, setTodoo] = useState<any>({});


  async function addTodo(){

    try{
      const newTodo:TodoType ={
        id:uuidv4().toString(),
        description:desc,
        status:"OPEN"
      }
      await axios.post("http://localhost:8080/api/v1/todos/todo", newTodo)
      setDesc("")
      location.reload();
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    async function getTodos(){
      try {
        const request = await axios.get("http://localhost:8080/api/v1/todos");
        if(request){
          setTodos(request.data);
        }else{
          return "could not fetch"
        }
      }catch(error){
        console.error(error)
      }
    }
    getTodos()
  },[])

  useEffect(() => {
    if (id !== "") {
      setIsEdit(true);
      todoRef.current.focus();
    } else {
      setIsEdit(false);
    }
  }, [isEdit, id]);

  const paperStyled = {
    padding:2,
    elevation:1,
    textAlign:"center",
    margin:3
  }

  async function deleteTodo(id:string){
     const todoToBeDeleted = todos.find((td) => td.id.toString() === id)
      if(todoToBeDeleted){
        await axios.delete(`http://localhost:8080/api/v1/todos/delete?id=${id}`);
      }
      location.reload()
  }



  async function editTodo(desc:string, status:string, id:string){
    try{
      const newTodo = {
        id:id,
        status:status,
        description:desc
      }
      const result = todos.find((todo) => todo.id.toString() === id)
      if(result) await axios.put(`http://localhost:8080/api/v1/todos/edit?id=${id}`,
          newTodo)
      location.reload()
    }catch(error){
        console.warn(error)
    }
  }


  return (
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Paper sx={paperStyled}>Todo App</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper sx={{display:"flex", padding:3, justifyContent:"space-between"}}>
              <TextField
                  multiline
                  label="add - todo"
                  variant="outlined"
                  inputRef={todoRef as any}
                  onChange={(event:any) => setDesc(event.target.value)}
              />
              {isEdit
                  ?
                  <FormControl size="small" sx={{minWidth: 120, mt:1}}>
                    <InputLabel>status</InputLabel>
                    <Select
                        value={status}
                        label="status"
                        onChange={(event:any) => {
                          setStatus(event.target.value)
                        }}
                    >
                      <MenuItem value="OPEN">OPEN</MenuItem>
                      <MenuItem value="DOING">DOING</MenuItem>
                      <MenuItem value="DONE">DONE</MenuItem>
                    </Select>
                  </FormControl>
                  : null }
              {
                !isEdit ?
                    <Button sx={{marginLeft:1}}
                      onClick={() => addTodo()}
                     >
                    <SaveIcon/>
                    </Button>
                    :
                    <Button variant="contained" onClick={() => editTodo(desc, status, id)}>Update</Button>
              }
            </Paper>
          </Grid>
          <Box>
            {
              showStatus ?
              <Dialog
                  setShowStatus={setShowStatus}
                  showStatus={showStatus}
                  status={status}
                  setStatus={setStatus}
                  setTodoo={setTodoo}
                  todoo={todoo}
                  todos={todos}
                  desc={desc}
                  statusId={statusId}
                  editTodo={editTodo}
              >
              </Dialog>
                  :
                  null
            }

          </Box>
          <Grid  item xs={12}>
            <Paper sx={paperStyled}>
              <Stack direction="row" spacing={1}>
                <Chip label="Clickable" variant="outlined"/>
                <Chip label="Clickable" variant="outlined"/>
              </Stack>
            </Paper>
          </Grid>

          <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
            {todos.map((todo:TodoType, index:number) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <Paper sx={paperStyled}>
                      <Typography>Task: {todo.description}</Typography>
                      <Typography>Task: {todo.status}</Typography>
                      <Button onClick={() => setId(todo.id.toString())}> <EditIcon/> </Button>
                      <Button onClick={() => {
                        setShowStatus(prev => !prev)
                        setStatusId(todo.id.toString())
                      }
                      }> change status </Button>
                    </Paper>
                  </Grid>
            ))}
          </Grid>
          <Grid  item xs={12}>
            <Paper sx={paperStyled}>
              <Typography> Footer cops</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    )
}

export default App
