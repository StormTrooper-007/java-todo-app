package com.collins.backend;

import com.collins.backend.models.Status;
import com.collins.backend.models.Todo;
import com.collins.backend.repository.TodoRepo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.UUID;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.*;


class TodoUnitTests {

    @Test
    void testsAddTodo() {
        TodoRepo todoRepo = mock(TodoRepo.class);
        Todo newTodo = new Todo(UUID.randomUUID().toString(), "todo", Status.OPEN);
        when(todoRepo.addTodo(newTodo)).thenReturn(newTodo);
        Todo expected = todoRepo.addTodo(newTodo);
        assertThat(expected.getId(), equalTo(newTodo.getId()));
        verify(todoRepo).addTodo(newTodo);
    }

    @Test
    void testGetTodo() {
        TodoRepo todoRepo = mock(TodoRepo.class);
        when(todoRepo.getTodos()).thenReturn(Arrays.asList());
        todoRepo.getTodos();
        verify(todoRepo).getTodos();
    }

    @Test
    void testGetTodoById() {
        TodoRepo todoRepo = spy(TodoRepo.class);
        Todo newTodo = new Todo("1", "todo", Status.OPEN);

        todoRepo.addTodo(newTodo);

        String actual = todoRepo.getTodoById("1").getId();
        String expected = newTodo.getId();

        Assertions.assertTrue(todoRepo.getTodos().contains(newTodo));
        Assertions.assertEquals(expected, actual);
    }

    @Test
    void testDeleteTodo() {
        TodoRepo todoRepo = spy(TodoRepo.class);
        Todo newTodo = new Todo("1", "todo", Status.OPEN);
        todoRepo.addTodo(newTodo);
        Assertions.assertTrue(todoRepo.getTodos().contains(newTodo));
        todoRepo.deleteTodo("1");
        Assertions.assertTrue(todoRepo.getTodos().isEmpty());
    }

    @Test
    void testEditTodo() {
        TodoRepo todoRepo = spy(TodoRepo.class);
        Todo newTodo = new Todo("1", "todo", Status.OPEN);
        todoRepo.addTodo(newTodo);
        Todo actual = todoRepo.editTodo(new Todo("1", "my new todo", Status.OPEN), newTodo.getId());
        Todo expected = todoRepo.getTodoById("1");
        Assertions.assertEquals(expected, actual);
    }

}
