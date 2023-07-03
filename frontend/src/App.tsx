import {Box, Grid} from "@mui/material";
import AppHeader from "./components/AppHeader.tsx";


function App() {
    /* const [desc, setDesc] = useState<string>("");
     const [filters, setFilters] = useState<[]>([]);
     const [activeFilters, setActiveFilters] = useState<string>("OPEN");
     const [error, setError] =
         useState<{getError:string, postError:string}>({
         getError:"",
         postError:""
     });*/


    /*  async function getTodos() {
          try {
              const request = await axios.get("http://localhost:8080/api/v1/todos")
              setTodos(request.data)
          } catch (error) {
              if(error instanceof AxiosError) setError({postError: "", getError:"could not fetch todos"});
          }
      }*/

    /*   useEffect(() => {
           getTodos()
           setFilters(todos);
       }, [])*/

    /*    async function addTodo() {
            try {
                const newTodo:{description:string, status:string} = {
                    description: desc,
                    status: "OPEN"
                }
                await axios.post("http://localhost:8080/api/v1/todos", newTodo)
                setDesc("")
                setTodos(todos)
            } catch (error) {
                if(error instanceof AxiosError) setError({getError: "", postError:"could not add todo"});
            }
        }*/

    /* async function patchTodo(status: string, statusId: string) {
         try {
             const patchData: { status: string } = {
                 status: status
             }
             await axios.patch(`http://localhost:8080/api/v1/todos/status?id=${statusId}`, patchData)
         } catch (error) {
             console.warn(error)
         }
     }*/

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

    /* async function deleteTodo(id: string) {
         try {
             await axios.delete(`http://localhost:8080/api/v1/todos/delete?id=${id}`)
         } catch (error) {
             console.log(error)
         }
     }*/


    /* useEffect(() => {
         const filters = todos.filter((td) => td.status.includes(activeFilters))
         setFilters(filters)
     })*/


    //const activeStyled = {backgroundColor: "blue"}

    return (
        <Box sx={{flexGrow: 1}}>
            <Grid container spacing={2}>
                <AppHeader/>

            </Grid>
        </Box>
    )
}

export default App
