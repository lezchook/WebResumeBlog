package ru.leshchenko.webresumeblog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.leshchenko.webresumeblog.domain.Post;
import ru.leshchenko.webresumeblog.repo.PostRepository;

import java.text.DateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

@Service
public class PostService {

    private long ID = 1;

    @Autowired
    private PostRepository postRepository;

    public void savePost(Post post) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        post.setDate(LocalDateTime.now().format(formatter));
        post.setId(Long.valueOf(ID));
        postRepository.save(post);
        ID++;
    }
}
