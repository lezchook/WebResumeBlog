package ru.leshchenko.webresumeblog.domain;

import lombok.Data;

import javax.persistence.*;

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
