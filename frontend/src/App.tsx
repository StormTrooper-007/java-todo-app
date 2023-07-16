import AppHeader from "./components/AppHeader.tsx";
import {FormEvent, useEffect, useState} from "react";
import TodoForm from "./components/TodoForm.tsx";
import TodosContainer from "./components/TodosContainer.tsx";
import TodoChips from "./components/TodoChips.tsx";
import EditDialog from "./components/EditDialog.tsx";
import {TodoType} from "./Utils.tsx";
import axios from "axios";


function App() {

    /*
     const [filters, setFilters] = useState<[]>([]);
     const [activeFilters, setActiveFilters] = useState<string>("OPEN");*/

    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState("")
    const [todoObj, setTodoObj] = useState<TodoType>(
        {id: "", description: "", status: 0, date: ""});
    const [description, setDescription] = useState<string>("");

    /* useEffect(() => {
           getTodos()
           setFilters(todos);
       }, [])*/

    /* useEffect(() => {
         const filters = todos.filter((td) => td.status.includes(activeFilters))
         setFilters(filters)
     })*/


    //const activeStyled = {backgroundColor: "blue"}

    const handleClickOpen = (id: string) => {
        setOpen(true)
        setIsEdit(true)
        setId(id)
    };
    const [username, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [currentUser, setCurrentUser] = useState<string>("")

    function login(e: FormEvent) {
        e.preventDefault()
        axios.post("/api/v1/users/login", {username, password},
            {auth: {username, password}, headers: {'Content-Type': 'application/json'}})
            .then((response) => setCurrentUser(response.data))
            .catch((error) => console.log(error))
        setUserName("")
        setPassword("")
    }

    function me() {
        axios.get("/api/v1/users/me2")
            .then(response => setCurrentUser(response.data));
    }

    useEffect(() => {
        me();
    })


    return (
        <>
            <EditDialog open={open} description={description} setOpen={setOpen} todoObj={todoObj} setIsEdit={setIsEdit}
                        id={id} setId={setId}/>
            <AppHeader/>
            <TodoForm id={id} setIsEdit={setIsEdit} isEdit={isEdit} description={description}
                      setDescription={setDescription}/>
            <TodoChips/>
            <TodosContainer setTodoObj={setTodoObj} setIsEdit={setIsEdit} handleClickOpen={handleClickOpen}
                            setOpen={setOpen}/>
            <div>{currentUser}</div>

            <form onSubmit={login}>
                <label>
                    username:
                    <input type="text"
                           value={username}
                           onChange={(e) => setUserName(e.target.value)}/>
                </label>
                <label>
                    password:
                    <input
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}/>
                </label>
                <button>login</button>
            </form>
        </>
    )
}

export default App
