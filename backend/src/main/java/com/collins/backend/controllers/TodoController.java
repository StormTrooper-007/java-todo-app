package com.collins.backend.controllers;


import com.collins.backend.models.Todo;
import com.collins.backend.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/todos")
@CrossOrigin(origins = "http://localhost:5173")
public class TodoController {

    private TodoService todoService;


    @Autowired
    public TodoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping
    public List<Todo> getTodos() {
        return todoService.getTodos();
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo) {
        return todoService.addTodo(todo);
    }

    @DeleteMapping
    public List<Todo> deleteTodo(@RequestParam String id) {
        return todoService.deleteTodo(id);
    }

    @PutMapping
    public Todo editTodo(@RequestBody Todo todoEdit, @RequestParam String id) {
        return todoService.editTodo(todoEdit, id);
    }

    @PatchMapping
    public Todo patchTodo(@RequestBody Todo patchTodo, @RequestParam String id) {
        return todoService.editTodoStatus(patchTodo, id);
    }

}
