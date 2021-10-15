package ru.leshchenko.webresumeblog.controller;

import com.fasterxml.jackson.core.JsonParser;
import org.apache.tomcat.util.json.JSONParser;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.leshchenko.webresumeblog.domain.Post;
import ru.leshchenko.webresumeblog.service.PostService;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    PostService postService;

    @PostMapping("/post")
    public void setPost(@RequestBody Post post ) {
        postService.savePost(post);
        JSONArray jsonA = new JSONArray().put(postService.getAllPost());
        System.out.println(jsonA);
    }

    @GetMapping("/posts")
    public List<Post> getPosts() {
        JSONArray jsonA = new JSONArray().put(postService.getAllPost());
        return postService.getAllPost();
    }
}
