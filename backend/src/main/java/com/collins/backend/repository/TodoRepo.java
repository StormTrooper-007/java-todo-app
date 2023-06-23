package com.collins.backend.repository;

import com.collins.backend.models.Status;
import com.collins.backend.models.Todo;
import lombok.Data;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.service.annotation.PutExchange;

import java.util.ArrayList;
import java.util.List;

import static com.collins.backend.models.Status.OPEN;

@Repository
@Data
public class TodoRepo {
    private List<Todo> todosList;

    public TodoRepo(){
        this.todosList = new ArrayList<>();
        todosList.add(new Todo("1", "am doing", Status.OPEN));
    }

    public List<Todo> getTodos(){
        return todosList;
    }

    public List<Todo> addTodo(Todo newTodo){
        todosList.add(newTodo);
        return todosList;
    }

    public List<Todo> deleteTodo(Todo todo){
        for(Todo t:todosList){
            if(t.getId().equals(todo.getId())){
                todosList.remove(t);
            }

        }
        return todosList;
    }

    public List<Todo> editTodo(Todo toBeEditedTodo){
        for(Todo todo:todosList){
            if(todo.getId().equals(toBeEditedTodo.getId())){
                todo.setStatus(toBeEditedTodo.getStatus());
                todo.setDescription(toBeEditedTodo.getDescription());
            }
        }
        return todosList;
    }

}
