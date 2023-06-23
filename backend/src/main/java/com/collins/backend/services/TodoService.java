package com.collins.backend.services;

import com.collins.backend.models.Todo;
import com.collins.backend.repository.TodoRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TodoService {

    private TodoRepo todoRepo;

    @Autowired
    public TodoService(TodoRepo todoRepo){
        this.todoRepo = todoRepo;
    }

    public List<Todo> getTodos(){
        return todoRepo.getTodos();
    }

    public List<Todo> addTodo(Todo todo){
        return todoRepo.addTodo(todo);
    }

    public List<Todo> deleteTodo(Todo todo){
        return todoRepo.deleteTodo(todo);
    }

    public List<Todo> editTodo(Todo toBeEditedTodo){
        return todoRepo.editTodo(toBeEditedTodo);
    }

}
