package com.collins.backend.controllers;


import com.collins.backend.models.Todo;
import com.collins.backend.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1")
public class TodoController {

    private final TodoService todoService;

    @Autowired
    public TodoController(TodoService todoService){
        this.todoService = todoService;
    }

    @GetMapping("/todos")
    public List<Todo> getTodos(){
        return todoService.getTodos();
    }

    @PostMapping("/todos/todo")
    public List<Todo> addTodo(@RequestBody Todo todo){
        return todoService.addTodo(todo);
    }
    @DeleteMapping("/todos/delete-todo")
    public List<Todo> deleteTodo(@RequestBody Todo todo ){
        return todoService.deleteTodo(todo);
    }

    @PutMapping("/todos/edit-todo")
    public List<Todo> editTodo(@RequestBody Todo toBeEditedTodo){
        return todoService.editTodo(toBeEditedTodo);
    }

}
