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
    }

    public List<Todo> getTodos(){
        return todosList;
    }

    public List<Todo> addTodo(Todo newTodo){
        todosList.add(newTodo);
        return todosList;
    }

    public Todo getTodoById(String id){
        for(Todo todo: todosList){
            if(todo.getId().equals(id)) {
                return todo;
            }
        }
        return null;
    }

    public List<Todo> deleteTodo(String id){
        Todo todo = getTodoById(id);
        todosList.remove(todo);
        return todosList;
    }


    public List<Todo> editTodo(Todo todoEdit, String id){
        for(Todo todo:todosList){
            if(todo.getId().equals(id)){
                todo.setStatus(todoEdit.getStatus());
                todo.setDescription(todoEdit.getDescription());
            }
        }
        return todosList;
    }

    public void patchTodo(Todo todoPatch, String id){
        for(Todo todo:todosList){
            if(todo.getId().equals(id)) {
                todo.setStatus(todoPatch.getStatus());
                todo.setDescription(todoPatch.getDescription());
            }
        }
    }

}
