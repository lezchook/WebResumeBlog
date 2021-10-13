package ru.leshchenko.webresumeblog.controller;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @GetMapping("/success")
    public ModelAndView success() {
        ModelAndView mav = new ModelAndView("index");
        return mav;
    }

    @GetMapping("/info")
    public String profileInfo() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }

    @PostMapping("/register")
    public void register() {
        System.out.println("test");
    }
}
