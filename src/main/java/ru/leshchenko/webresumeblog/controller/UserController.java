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

import javax.persistence.EntityNotFoundException;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

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
    }

    @PostMapping("/key")
    public void keyCheck(@RequestBody String str) {
        String key = str.replace("=", "");
        if (key.equals("1234")) {

        }
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

    @PostMapping("/validat")
    public void validat(@RequestBody User user) {
        userService.validate(user);
    }

    @GetMapping("/validate")
    public String validate() {
        if (!UserService.vali) return "Success!";
        else return "User is already registered";
    }

    @PostMapping("/like/{id}")
    public void like(@PathVariable(name = "id") Long Id) {
        Post post = postService.getPostById(Id);
        User user = userService.getUserByName(SecurityContextHolder.getContext().getAuthentication().getName());
        Set<User> userSet = post.getUsers();
        userSet.add(user);
        post.setUsers(userSet);
        postService.updatePost(post);
        System.out.println(post);
    }

    @GetMapping("/like/count/{id}")
    public String likeCount(@PathVariable(name = "id") Long Id) {
        Post post = postService.getPostById(Id);
        try {
            Set<User> userSet = post.getUsers();
            return String.valueOf(userSet.size());
        } catch (EntityNotFoundException e) {
            return "0";
        }
    }
}
/*
UPDATE user_role
SET roles = 'ADMIN'
WHERE user_id = 26;
 */
