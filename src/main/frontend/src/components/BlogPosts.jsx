import {BlogBar} from './BlogBar';
import React from "react";
import {NewPostEditor} from './NewPostEditor';
import axios from 'axios';

const posts = [
    {
        id: 0,
        title: 'Post 1',
        description: 'Test Post 1',
        liked: false,
        username: 'ano',
        date: ''
    }
]

class BlogPosts extends React.Component {

    componentDidMount() {
        axios.get('http://192.168.1.33:8080/user/posts').then((res) => this.setState({blogArr: res.data}));
        axios.get('http://192.168.1.33:8080/user/inform').then((res) => this.setState({visiDelete: res.data}));
        axios.get('http://192.168.1.33:8080/user/informLike').then((res) => this.setState({visiLike: res.data}));
    }

    componentDidUpdate() {
        axios.get('http://192.168.1.33:8080/user/posts').then((res) => this.setState({blogArr: res.data}))
    }

    state = {
        blogArr: [],
        visiDelete: "",
        visiLike: ""
    }

    likePost = (pos) => {
        const blogPosts = this.state.blogArr.slice(0).reverse();
        axios.post('http://192.168.1.33:8080/user/like/'+ blogPosts[pos].id);
    }

    deletePost = (pos) => {
        const blogPosts = this.state.blogArr.slice(0).reverse();
        axios.delete('http://192.168.1.33:8080/user/delete/'+ blogPosts[pos].id);
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
                    id = {item.id}
                    title = {item.title}
                    description = {item.description}
                    liked = {item.liked}
                    username = {item.username}
                    likePost = {() => this.likePost(pos)}
                    deletePost = {() => this.deletePost(pos)}
                    posts = {this.state.blogArr}
                    visiDelete = {this.state.visiDelete}
                    date = {item.date}
                    visiLike = {this.state.visiLike}
                />
            )
        })
        return (
            <div>
                {blogPosts}
            </div>
        );
    }
}

export default BlogPosts;