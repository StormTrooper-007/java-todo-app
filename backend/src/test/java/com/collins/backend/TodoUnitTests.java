package com.collins.backend;

import com.collins.backend.models.Status;
import com.collins.backend.models.Todo;
import com.collins.backend.models.TodoConverter;
import com.collins.backend.models.TodoDTO;
import com.collins.backend.repository.TodoRepository;
import com.collins.backend.services.TodoService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.Mockito.*;


class TodoUnitTests {

    TodoRepository todoRepository = spy(TodoRepository.class);

    TodoConverter todoConverter = new TodoConverter();
    TodoService todoService = new TodoService(todoRepository, todoConverter);

    @Test
    void testGetAllTodos() {
        List<Todo> expected = Arrays.asList(
                new Todo("1", "cooking", Status.OPEN, "10.07.2023"),
                new Todo("2", "eating", Status.OPEN, "10.07.2023")
        );

        when(todoRepository.findAll()).thenReturn(expected);

        List<Todo> actual = todoService.getAllTodos();
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testAddTodo() {
        Todo expected = new Todo("1", "cooking", Status.OPEN, "10.07.2023");

        when(todoRepository.save(expected)).thenReturn(expected);

        Todo actual = todoService.addTodo(new TodoDTO(expected.getDescription(), expected.getStatus(), expected.getDate()));
        Assertions.assertEquals(expected.getDescription(), actual.getDescription());
        Assertions.assertNotNull(actual.getId());
        Assertions.assertNotNull(actual.getDate());
    }

    @Test
    void testDelete() {
        todoRepository.deleteById("1");
        verify(todoRepository).deleteById("1");
    }

    @Test
    void testEditTodo() {
        when(todoRepository.findById("1"))
                .thenReturn(Optional.of(new Todo("1", "cooking", Status.OPEN, "10.07.2023")));
        Todo actual = todoService.editStatus(new Todo("1", "cooking", Status.DOING, "10.07.2023"), "1");
        Assertions.assertNotEquals(new Todo("1", "cooking", Status.OPEN, "10.07.2023"), actual);
    }

}
