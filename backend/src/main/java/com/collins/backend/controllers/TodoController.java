package com.collins.backend.controllers;


import com.collins.backend.models.Todo;
import com.collins.backend.models.TodoDTO;
import com.collins.backend.services.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping
    public ResponseEntity<List<Todo>> getTodos() {
        return ResponseEntity.ok(todoService.getAllTodos());
    }

    @PostMapping
    public ResponseEntity<Todo> addTodo(@RequestBody TodoDTO todoDTO) {
        return ResponseEntity.ok(todoService.addTodo(todoDTO));

    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable String id) {
        todoService.deleteTodo(id);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Todo> patchTodo(@RequestBody Todo todo, @PathVariable String id) {
        return ResponseEntity.ok(todoService.editStatus(todo, id));
    }

}
