package ru.leshchenko.webresumeblog.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.leshchenko.webresumeblog.domain.Post;
import ru.leshchenko.webresumeblog.repo.PostRepository;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    PostRepository postRepository;

    @PostMapping("/post")
    public void setPost(@RequestBody HashMap<String, String> post ) {
        Post post_req = new Post();
        post_req.setId(new Long(post.get("id")));
        post_req.setDescription(post.get("description"));
        post_req.setTitle(post.get("title"));
        postRepository.save(post_req);
    }
}
