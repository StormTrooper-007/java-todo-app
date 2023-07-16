package com.collins.backend.repository;

import com.collins.backend.models.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TodoRepository extends MongoRepository<Todo, String> {

}
