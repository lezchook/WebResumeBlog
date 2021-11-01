package ru.leshchenko.webresumeblog.controller;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.leshchenko.webresumeblog.domain.Post;
import ru.leshchenko.webresumeblog.domain.Role;
import ru.leshchenko.webresumeblog.domain.User;
import ru.leshchenko.webresumeblog.service.PostService;
import ru.leshchenko.webresumeblog.service.UserService;

import java.util.Iterator;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    PostService postService;

    @Autowired
    UserService userService;

    @PostMapping("/post")
    public void setPost(@RequestBody Post post ) {
        post.setUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        postService.savePost(post);
        JSONArray jsonA = new JSONArray().put(postService.getAllPost());
        System.out.println(jsonA);
    }

    @GetMapping("/inform")
    public String getRole() {
        List<User> users = userService.getAllUser();
        Iterator<User> iterator = users.iterator();
        int i = 0;
        if (SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
            return "hidden";
        }
        while (iterator.hasNext()) {
            if (users.get(i).getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
                break;
            }
            i++;
            iterator.next();
        }
        if (users.get(i).getRoles().toArray()[0].equals(Role.USER)) {
            return "hidden";
        }
        if (users.get(i).getRoles().toArray()[0].equals(Role.ADMIN)) {
            return "visible";
        } else {
            return "hidden";
        }
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
/*
UPDATE user_role
SET roles = 'ADMIN'
WHERE user_id = 26;
 */
