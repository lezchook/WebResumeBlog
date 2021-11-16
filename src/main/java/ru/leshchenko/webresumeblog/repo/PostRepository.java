package ru.leshchenko.webresumeblog.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.leshchenko.webresumeblog.domain.Post;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
    List<Post> findAllBy();
    void deleteById(Long Id);
    Post getPostById(Long Id);
}
