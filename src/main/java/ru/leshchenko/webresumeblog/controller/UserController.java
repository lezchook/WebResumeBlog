package ru.leshchenko.webresumeblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.leshchenko.webresumeblog.domain.Post;
import ru.leshchenko.webresumeblog.service.PostService;

import java.util.HashMap;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    PostService postService;

    @PostMapping("/post")
    public void setPost(@RequestBody Post post ) {
        postService.savePost(post);
    }
}
