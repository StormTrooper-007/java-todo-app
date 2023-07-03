package com.collins.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    private String id = UUID.randomUUID().toString();
    private String description;
    private Status status;
}
