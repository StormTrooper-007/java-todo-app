package com.collins.backend.models;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class TodoConverter {
    public TodoDTO convertEntityToDto(Todo todo) {
        ModelMapper modelMapper = new ModelMapper();
        TodoDTO todoDTO = modelMapper.map(todo, TodoDTO.class);
        return todoDTO;
    }

    public Todo convertDtoToEntity(TodoDTO todoDTO) {
        ModelMapper modelMapper = new ModelMapper();
        Todo todo = modelMapper.map(todoDTO, Todo.class);
        return todo;
    }
}
