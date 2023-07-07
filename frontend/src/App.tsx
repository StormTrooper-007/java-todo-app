import AppHeader from "./components/AppHeader.tsx";
import {useState} from "react";
import TodoForm from "./components/TodoForm.tsx";
import TodosContainer from "./components/TodosContainer.tsx";
import TodoChips from "./components/TodoChips.tsx";
import EditDialog from "./components/EditDialog.tsx";
import {TodoType} from "./Utils.tsx";


function App() {

    /*
     const [filters, setFilters] = useState<[]>([]);
     const [activeFilters, setActiveFilters] = useState<string>("OPEN");*/

    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [id, setId] = useState("")
    const [todoObj, setTodoObj] = useState<TodoType>(
        {id: "", description: "", status: 0});
    const [description, setDescription] = useState<string>("");


    /* useEffect(() => {
           getTodos()
           setFilters(todos);
       }, [])*/


    /*   async function editTodo(desc: string, status: string, id: string) {
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
       }*/


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
        </>
    )
}

export default App
