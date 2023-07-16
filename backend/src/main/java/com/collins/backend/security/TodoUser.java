package com.collins.backend.security;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public record TodoUser(
        @Id
        String id,
        String username,
        String password
) {
}


