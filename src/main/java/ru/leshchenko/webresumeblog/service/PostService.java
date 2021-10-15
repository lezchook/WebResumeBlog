package ru.leshchenko.webresumeblog.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.leshchenko.webresumeblog.domain.Post;
import ru.leshchenko.webresumeblog.repo.PostRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    public List<Post> getAllPost() {
        List<Post> posts = new ArrayList<>();
        postRepository.findAll().forEach(post -> posts.add(post));
        return posts;
    }

    public void savePost(Post post) {
        postRepository.save(post);
    }

    public void delete(Long id) {
        postRepository.deleteById(id);
    }
}
