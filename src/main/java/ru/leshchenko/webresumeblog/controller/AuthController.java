package ru.leshchenko.webresumeblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import ru.leshchenko.webresumeblog.domain.Role;
import ru.leshchenko.webresumeblog.domain.User;
import ru.leshchenko.webresumeblog.service.UserService;

import javax.servlet.http.HttpServletRequest;
import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @GetMapping("/success")
    public ModelAndView success() {
        ModelAndView mav = new ModelAndView("index");
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

    @GetMapping("/login-error")
    public ModelAndView failLogin() {
        ModelAndView mav = new ModelAndView("index");
        return mav;
    }

    @PostMapping("/register")
    public ModelAndView addUser(@RequestBody User user, HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("index");
        if (!UserService.vali) {
            userService.saveUser(user);
        }
        System.out.println(request.getRemoteAddr());
        return mav;
    }

    @GetMapping("/inform")
    public String getRole() {
        if (SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
            return "visible";
        } else {
            return "hidden";
        }
    }
}
