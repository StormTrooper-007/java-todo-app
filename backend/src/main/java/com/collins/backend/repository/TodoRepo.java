package com.collins.backend.repository;

import com.collins.backend.models.Todo;
import lombok.Data;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

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

    public Todo addTodo(Todo newTodo) {
        todosList.add(newTodo);
        return newTodo;
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


    public Todo editTodo(Todo todoEdit, String id) {
        for (Todo todo : todosList) {
            if (todo.getId().equals(id)) {
                todo.setStatus(todoEdit.getStatus());
                todo.setDescription(todoEdit.getDescription());
            }
        }
        return todoEdit;
    }

    public Todo editTodoStatus(Todo patchTodo, String id) {
        for (Todo todo : todosList) {
            if (todo.getId().equals(id)) {
                todo.setStatus(patchTodo.getStatus());
            }
        }
        return patchTodo;
    }

}
