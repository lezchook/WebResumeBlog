import {BlogBar} from './BlogBar';
import React from "react";
import {NewPostEditor} from './NewPostEditor';

const posts = [
    {
        id: 1,
        title: 'Post 1',
        description: 'Test Post 1',
        liked: false
    },
    {
        id: 2,
        title: 'Post 2',
        description: 'Test Post 2',
        liked: false
    },
    {
        id: 3,
        title: 'Post 3',
        description: 'Test Post 3',
        liked: false
    }
]

class BlogPosts extends React.Component {

    state = {
        blogArr: JSON.parse(localStorage.getItem('blogPosts')) || posts
    }

    likePost = (pos) => {
        const temp = [...this.state.blogArr];
        temp[pos].liked = !temp[pos].liked;
        this.setState({blogArr: temp});
        localStorage.setItem('blogPosts', JSON.stringify(temp))
    }

    deletPost = (pos) => {
        const temp = [...this.state.blogArr];
        temp.splice(pos, 1);
        this.setState({blogArr: temp})
        localStorage.setItem('blogPosts', JSON.stringify(temp))
    }

    addNewPost = (newPost) => {
        this.setState((state) => {
           const posts = [...state.blogArr];
           posts.push(newPost);
            localStorage.setItem('blogPosts', JSON.stringify(posts));
            return {
               blogArr: posts
           }
        })

    }
    render() {
        const blogPosts = this.state.blogArr.map((item, pos) => {
            return(
                <BlogBar
                    key = {item.id}
                    title = {item.title}
                    description = {item.description}
                    liked = {item.liked}
                    likePost = {() => this.likePost(pos)}
                    deletPost = {() => this.deletPost(pos)}
                />
            )
        })
        return (
            <div>
                <NewPostEditor
                    posts = {this.state.blogArr}
                    addNewPost = {this.addNewPost}
                />
                {blogPosts}
            </div>
        );
    }
}

export default BlogPosts;