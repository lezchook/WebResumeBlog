package ru.leshchenko.webresumeblog.controller;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import ru.leshchenko.webresumeblog.domain.Post;
import ru.leshchenko.webresumeblog.domain.Role;
import ru.leshchenko.webresumeblog.domain.User;
import ru.leshchenko.webresumeblog.repo.PostRepository;
import ru.leshchenko.webresumeblog.repo.UserRepository;
import ru.leshchenko.webresumeblog.service.PostService;
import ru.leshchenko.webresumeblog.service.UserService;

import javax.persistence.EntityNotFoundException;
import java.util.Collections;
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

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/post")
    public void setPost(@RequestBody Post post ) {
        post.setUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        postService.savePost(post);
    }

    @PostMapping("/key")
    public void keyCheck(@RequestBody String str) {
        String key = str.replace("=", "");
        if (key.equals("1234")) {
            User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
            userService.setAdminRole(user);
        }
    }

    @GetMapping("/inform")
    public String getRole() {
        List<User> users = userRepository.findAllBy();
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

    @GetMapping("/informLike")
    public String getLikeInfo() {
        if (SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
            return "none";
        } else {
            return "contents";
        }
    }

    @GetMapping("/inform2")
    public String getRole2() {
        List<User> users = userRepository.findAllBy();
        Iterator<User> iterator = users.iterator();
        int i = 0;
        if (SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
            return "none";
        }
        while (iterator.hasNext()) {
            if (users.get(i).getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
                break;
            }
            i++;
            iterator.next();
        }
        if (users.get(i).getRoles().toArray()[0].equals(Role.USER)) {
            return "none";
        }
        if (users.get(i).getRoles().toArray()[0].equals(Role.ADMIN)) {
            return "visible";
        } else {
            return "none";
        }
    }

    @GetMapping("/inform2rev")
    public String getRole2rev() {
        List<User> users = userRepository.findAllBy();
        Iterator<User> iterator = users.iterator();
        int i = 0;
        if (SecurityContextHolder.getContext().getAuthentication().getName().equals("anonymousUser")) {
            return "none";
        }
        while (iterator.hasNext()) {
            if (users.get(i).getUsername().equals(SecurityContextHolder.getContext().getAuthentication().getName())) {
                break;
            }
            i++;
            iterator.next();
        }
        if (users.get(i).getRoles().toArray()[0].equals(Role.USER)) {
            return "visible";
        }
        if (users.get(i).getRoles().toArray()[0].equals(Role.ADMIN)) {
            return "none";
        } else {
            return "visible";
        }
    }

    @GetMapping("/keycheck/{key}")
    public String keyCheck(@PathVariable(name = "key") Long Id) {
        if (Id == 1234) return "Now you are admin! Update page";
        else return "Not correct key";
    }

    @GetMapping("/posts")
    public List<Post> getPosts() {
        return postRepository.findAllBy();
    }

    @DeleteMapping("/delete/{id}")
    public void deletePost(@PathVariable(name = "id") Long Id) throws InterruptedException {
        postRepository.deleteById(Id);
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
        Post post = postRepository.getPostById(Id);
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Set<User> userSet = post.getUsers();
        userSet.add(user);
        post.setUsers(userSet);
        postRepository.save(post);
    }

    @DeleteMapping("/like/delete/{id}")
    public void likeDelete(@PathVariable(name = "id") Long Id) {
        Post post = postRepository.getPostById(Id);
        User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        Set<User> userSet = post.getUsers();
        userSet.remove(user);
        post.setUsers(userSet);
        postRepository.save(post);
    }

    @GetMapping("/like/inform/{id}")
    public String likeClicked(@PathVariable(name = "id") Long Id) {
        Post post = postRepository.getPostById(Id);
        try {
            try {
                System.out.println(Id);
                Set<User> userSet = post.getUsers();
                User user = userRepository.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
                if (userSet.contains(user)) return "tru";
                else return "fals";
            } catch (NullPointerException e) {
                return "0";
            }
        } catch (EntityNotFoundException e) {
            return "0";
        }
    }

    @GetMapping("/like/count/{id}")
    public String likeCount(@PathVariable(name = "id") Long Id) {
        Post post = postRepository.getPostById(Id);
        try {
            try {
                Set<User> userSet = post.getUsers();
                return String.valueOf(userSet.size());
            } catch (NullPointerException e) {
                return "0";
            }
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
