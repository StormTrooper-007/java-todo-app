package com.collins.backend.controllers;


import com.collins.backend.models.Status;
import com.collins.backend.models.Todo;
import com.collins.backend.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:5173")
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
    @DeleteMapping("/todos/delete")
    public List<Todo> deleteTodo(@RequestParam String id){
        return todoService.deleteTodo(id);
    }

    @PutMapping("/todos/edit")
    public List<Todo> editTodo(@RequestBody Todo todoEdit, @RequestParam String id){
        return todoService.editTodo(todoEdit, id);
    }

    @PutMapping("/todos/status")
    public void patchTodo(@RequestBody Todo todoPatch, @RequestParam String id){
         todoService.patchTodo(todoPatch, id);
    }

}
