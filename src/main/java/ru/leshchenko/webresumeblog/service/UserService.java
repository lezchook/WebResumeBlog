package ru.leshchenko.webresumeblog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.leshchenko.webresumeblog.domain.Post;
import ru.leshchenko.webresumeblog.domain.Role;
import ru.leshchenko.webresumeblog.domain.User;
import ru.leshchenko.webresumeblog.repo.PostRepository;
import ru.leshchenko.webresumeblog.repo.UserRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public static boolean vali = false;

    public void saveUser(User user) {
        user.setRoles(Collections.singleton(Role.USER));
        user.setActive(true);
        userRepository.save(user);
    }

    public void setAdminRole(User user) {
        delete(user.getId());
        user.setRoles(Collections.singleton(Role.ADMIN));
        userRepository.save(user);
    }

    public void delete(Long id) {
        userRepository.deleteById(id);
    }

    public void validate(User user) {
        vali = false;
        List<User> users = userRepository.findAllBy();
        Iterator<User> iterator = users.iterator();
        int i = 0;
        while (iterator.hasNext()) {
            if (users.get(i).getUsername().equals(user.getUsername())) {
                vali = true;
                break;
            }
            i++;
            iterator.next();
        }

    }
}
