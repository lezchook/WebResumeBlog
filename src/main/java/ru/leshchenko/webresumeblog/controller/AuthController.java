package ru.leshchenko.webresumeblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.leshchenko.webresumeblog.domain.Role;
import ru.leshchenko.webresumeblog.domain.User;
import ru.leshchenko.webresumeblog.repo.UserRepository;

import java.util.Collections;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/success")
    public ModelAndView success() {
        ModelAndView mav = new ModelAndView("index");
        System.out.println();
        return mav;
    }

    @GetMapping("/info")
    public String profileInfo() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @GetMapping("/register")
    public ModelAndView register() {
        ModelAndView mav = new ModelAndView("index");
        return mav;
    }

    @PostMapping("/register")
    public ModelAndView addUser(@RequestBody User user) {
        ModelAndView mav = new ModelAndView("index");
        user.setActive(true);
        user.setRoles(Collections.singleton(Role.USER));
        userRepository.save(user);
        return mav;
    }
}
