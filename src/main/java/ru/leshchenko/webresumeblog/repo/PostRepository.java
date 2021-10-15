package ru.leshchenko.webresumeblog.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import ru.leshchenko.webresumeblog.domain.Post;

@Repository
public interface PostRepository extends JpaRepository<Post,Long> {

}
