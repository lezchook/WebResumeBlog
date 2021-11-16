package ru.leshchenko.webresumeblog.domain;

import javassist.bytecode.stackmap.TypeData;
import lombok.Data;
import org.hibernate.annotations.CollectionType;
import org.hibernate.annotations.LazyCollection;
import org.jboss.jandex.ClassType;
import org.springframework.context.annotation.Primary;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@Table(name = "POSTS")
public class Post {

    @Id
    @Column(name = "ID_POST")
    private Long id;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "TITLE")
    private String title;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "DATE")
    private String date;

    @ManyToMany(targetEntity = User.class)
    @CollectionTable(name="post_likes",joinColumns=@JoinColumn(name="post_id"))
    private Set<User> users;

    public Set<User> getUsers() {
        return this.users;
    }

    public void setUsers(Set<User> users) {
        this.users = users;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
