
import {
    Box,
    Button, Chip, FormControl,
    Grid, InputLabel, MenuItem,
    Paper, Select,
    Stack,
    TextField, Typography
} from "@mui/material";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import {v4 as uuidv4} from 'uuid';
import Dialog from "./components/Dialog.tsx";
import Todo from "./components/Todo.tsx";


export type TodoType = {
  id: string,
  description: string,
  status: string
}

function App() {
    const [desc, setDesc] = useState<string>("");
    const [todos, setTodos] = useState<TodoType[]>([]);
    const [id, setId] = useState<string>("");
    const [statusId, setStatusId] = useState<string>("");
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [status, setStatus] = useState<string>("OPEN");
    const todoRef = useRef("" as any);
    const [showStatus, setShowStatus] = useState<boolean>(false);
    const [cancelEdit, setCancelEdit] = useState<boolean>(false);
    const [filters, setFilters] = useState<TodoType[]>([]);
    const [activeFilters, setActiveFilters] = useState<string>("OPEN");


    async function getTodos() {
        try {
            const request = await axios.get("http://localhost:8080/api/v1/todos");
            if (request) {
                setTodos(request.data);
            } else {
                return "could not fetch"
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getTodos()
        setFilters(todos);
    }, [])


    async function addTodo() {
        try {
            const newTodo: TodoType = {
                id: uuidv4().toString(),
                description: desc,
                status: "OPEN"
            }
            await axios.post("http://localhost:8080/api/v1/todos/todo", newTodo)
            setDesc("")
            location.reload();
        } catch (error) {
            console.log(error)
        }
    }

    async function patchTodo(status: string, statusId: string) {
        try {
            const patchData: { status: string } = {
                status: status
            }
            await axios.patch(`http://localhost:8080/api/v1/todos/status?id=${statusId}`, patchData)
        } catch (error) {
            console.warn(error)
        }
    }

    async function editTodo(desc: string, status: string, id: string) {
        try {
            const newTodo = {
                id: id,
                status: status,
                description: desc
            }

            await axios.put(`http://localhost:8080/api/v1/todos/edit?id=${id}`,
                newTodo)
            location.reload()
        } catch (error) {
            console.warn(error)
        }
    }

    async function deleteTodo(id: string) {
        try {
            await axios.delete(`http://localhost:8080/api/v1/todos/delete?id=${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (id !== "") {
            setIsEdit(true);
            todoRef.current.focus();
        } else {
            setIsEdit(false);
        }
    }, [isEdit, id]);

    useEffect(() => {
        const filters = todos.filter((td) => td.status.includes(activeFilters))
        setFilters(filters)
    })

    const paperStyled = {
        padding: 2,
        elevation: 1,
        textAlign: "center",
        margin: 3
    }

    const activeStyled = {backgroundColor: "blue"}


  return (
      <Box sx={{flexGrow: 1}}>
          <Grid container spacing={2}>
              <Grid item xs={12} sx={{backgroundColor: "#33bfff"}}>
                  <Paper sx={paperStyled}>Todo App</Paper>
              </Grid>
              <Grid item xs={12}>
                  <Paper sx={{display: "flex", padding: 3, justifyContent: "space-between", alignItems: "center"}}>
                      <TextField
                          fullWidth={true}
                          sx={{margin: 2}}
                          multiline
                          label="add - todo"
                          variant="outlined"
                  inputRef={todoRef as any}
                  onChange={(event: any) => setDesc(event.target.value)}
              />
              {
                !isEdit ?
                    <Button variant="contained" sx={{marginLeft: 1, textTransform: "none"}}
                            onClick={() => addTodo()}
                    >
                        Add Todo
                    </Button>
                    :
                    <Button variant="contained"
                            sx={{
                              height: 20,
                              width: 20,
                              padding: 3,
                              paddingLeft: 1,
                              paddingRight: 1,
                              textTransform: "none"
                            }}
                            onClick={() => editTodo(desc, status, id)}>Update</Button>
              }
              {isEdit
                  ?
                  <FormControl size="small" sx={{minWidth: 120, margin: 2}}>
                    <InputLabel>status</InputLabel>
                    <Select
                        value={status}
                        label="status"
                        onChange={(event: any) => {
                          setStatus(event.target.value)
                        }}
                    >
                      <MenuItem value="OPEN">OPEN</MenuItem>
                      <MenuItem value="DOING">DOING</MenuItem>
                      <MenuItem value="DONE">DONE</MenuItem>
                    </Select>
                  </FormControl>
                  : null }
            </Paper>
          </Grid>
          <Box>
            {
              showStatus ?
              <Dialog
                  status={status}
                  setStatus={setStatus}
                  statusId={statusId}
                  patchTodo={patchTodo}
              >
              </Dialog>
                  :
                  null
            }

          </Box>
          <Grid  item xs={12}>
            <Paper sx={paperStyled}>
                <Stack direction="row" spacing={1}>
                    <Chip onClick={() => setActiveFilters("OPEN")} label="open" variant="outlined"
                          sx={{...activeStyled, backgroundColor: activeFilters === "OPEN" && "#349fda"}}/>
                    <Chip onClick={() => setActiveFilters("DOING")} label="doing" variant="outlined"
                          sx={{...activeStyled, backgroundColor: activeFilters === "DOING" && "#349fda"}}/>
                    <Chip onClick={() => setActiveFilters("DONE")} label="done" variant="outlined"
                          sx={{...activeStyled, backgroundColor: activeFilters === "DONE" && "#349fda"}}/>
                </Stack>
            </Paper>
          </Grid>

              <Grid container columns={{xs: 4, sm: 8, md: 12}}>
                  {filters.map((filter: TodoType, index: number) => (
                      <Grid item xs={2} sm={4} md={4} key={index}>
                          <Todo setId={setId}
                                setCancelEdit={setCancelEdit}
                                cancelEdit={cancelEdit}
                                setShowStatus={setShowStatus}
                                showStatus={showStatus}
                                setStatusId={setStatusId}
                                filter={filter}
                                deleteTodo={deleteTodo}
                          />
                      </Grid>
                  ))}
              </Grid>
              <Grid item xs={12}>
                  <Paper sx={paperStyled}>
                      <Typography> Footer cops</Typography>
                  </Paper>
              </Grid>
        </Grid>
      </Box>
    )
}

export default App
