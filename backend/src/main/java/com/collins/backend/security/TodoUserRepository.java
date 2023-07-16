package com.collins.backend.security;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TodoUserRepository extends MongoRepository<TodoUser, String> {
    Optional<TodoUser> findByUsername(String username);
}
