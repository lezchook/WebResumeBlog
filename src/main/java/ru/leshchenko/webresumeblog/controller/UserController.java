package ru.leshchenko.webresumeblog.controller;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.leshchenko.webresumeblog.domain.Post;
import ru.leshchenko.webresumeblog.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    PostService postService;

    @PostMapping("/post")
    public void setPost(@RequestBody Post post ) {
        post.setUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        postService.savePost(post);
        JSONArray jsonA = new JSONArray().put(postService.getAllPost());
        System.out.println(jsonA);
    }

    @GetMapping("/posts")
    public List<Post> getPosts() {
        JSONArray jsonA = new JSONArray().put(postService.getAllPost());
        return postService.getAllPost();
    }

    @DeleteMapping("/delete/{id}")
    public void deletePost(@PathVariable(name = "id") Long Id) throws InterruptedException {
        postService.delete(Id);
    }
}
