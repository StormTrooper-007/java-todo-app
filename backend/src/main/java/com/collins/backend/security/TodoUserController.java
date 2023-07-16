package com.collins.backend.security;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/v1/users")
public class TodoUserController {

    SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();

    @GetMapping("/me")
    public String getUserInfo(Principal principal) {
        return principal.getName();
    }

    @GetMapping("/me2")
    public String getUserInfo() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/login")
    public String login() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/users/logout")
    public void logout() {
        SecurityContextHolder.clearContext();
    }
}
