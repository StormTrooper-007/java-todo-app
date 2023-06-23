package com.collins.backend.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    private String id;
    private String description;
    private Status status;

   /* public Todo(String id, String description, Status status) {
        this.id = id;
        this.description = description;
        this.status = status;
    }*/

}
