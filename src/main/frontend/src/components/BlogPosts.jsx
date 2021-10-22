import {BlogBar} from './BlogBar';
import React from "react";
import {NewPostEditor} from './NewPostEditor';
import axios from 'axios';

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

    componentDidMount() {
        axios.get('http://localhost:8080/user/posts').then((res) => this.setState({blogArr: res.data}));
    }

    componentDidUpdate() {
        axios.get('http://localhost:8080/user/posts').then((res) => this.setState({blogArr: res.data}));
    }

    state = {
        blogArr: posts
    }

    likePost = (pos) => {
        const temp = [...this.state.blogArr];
        temp[pos].liked = !temp[pos].liked;
        this.setState({blogArr: temp});
    }

    deletPost = (pos) => {
        const blogPosts = this.state.blogArr.slice(0).reverse();
        axios.delete('http://localhost:8080/user/delete/'+ blogPosts[pos].id);
    }

    addNewPost = (newPost) => {
        this.setState((state) => {
           const posts = [...state.blogArr];
           posts.push(newPost);
            return {
               blogArr: posts
           }
        })

    }
    render() {
        const blogPosts = this.state.blogArr.slice(0).reverse().map((item, pos) => {
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