package com.collins.backend.services;

import com.collins.backend.models.Status;
import com.collins.backend.models.Todo;
import com.collins.backend.models.TodoConverter;
import com.collins.backend.models.TodoDTO;
import com.collins.backend.repository.TodoRepository;
import com.collins.backend.security.TodoUser;
import com.collins.backend.security.TodoUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;
    private final TodoUserRepository todoUserRepository;

    private final TodoConverter todoConverter;

    public List<Todo> getAllTodos() {
        return Optional.of(todoRepository.findAll())
                .orElseThrow(() -> new RuntimeException("Error occured while fetching"));
    }

    public String getTodoUserId() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        TodoUser currentUser = todoUserRepository.findByUsername(username).orElseThrow();
        return currentUser.id();
    }

    public Todo addTodo(TodoDTO todoDTO) {
        Todo todo = todoConverter.convertDtoToEntity(todoDTO);
        todo.setOwnerId(getTodoUserId());
        todo.setId(UUID.randomUUID().toString());
        todo.setSubmissionDate(new Date());
        todo.setStatus(Status.OPEN);
        todoRepository.save(todo);
        return todo;
    }

    public void deleteTodo(String id) {
        todoRepository.deleteById(id);
    }

    public Todo editStatus(Todo todo, String id) {
        Todo todoEdit = todoRepository.findById(id).orElseThrow(() -> new IndexOutOfBoundsException("Todo not found"));
        todoEdit.setStatus(todo.getStatus());
        todoRepository.save(todoEdit);
        return todoEdit;
    }

}
