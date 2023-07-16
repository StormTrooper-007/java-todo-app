package com.collins.backend.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class TodoUserDetailsService implements UserDetailsService {
    private final TodoUserRepository todoUserRepository;

    public TodoUserDetailsService(TodoUserRepository todoUserRepository) {
        this.todoUserRepository = todoUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TodoUser todoUser = todoUserRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Username: " + username + " not found!"));
        return new User(todoUser.username(), todoUser.password(), Collections.emptyList());
    }
}
