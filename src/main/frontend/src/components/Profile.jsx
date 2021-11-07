import React from "react";
import axios from "axios";
import {NewPostEditor} from "./NewPostEditor";

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

class Profile extends React.Component {

    componentDidMount() {
        axios.get('http://192.168.1.14:8080/auth/info').then((response) => {this.setState({name: response.data})});
        axios.get('http://192.168.1.14:8080/user/posts').then((res) => this.setState({blogArr: res.data}));
    }

    componentDidUpdate() {
        axios.get('http://192.168.1.14:8080/user/posts').then((res) => this.setState({blogArr: res.data}));
    }

    state = {
        name: '',
        blogArr: posts
    };

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
        return (
            <div className="window">
                <h3>Добро пожаловать, {this.state.name}</h3>
                <NewPostEditor
                    posts={this.state.blogArr}
                    addNewPost={this.addNewPost}
                />
                <form method="post" action="/auth/logout">
                    <button type="submit">LogOut</button>
                </form>
            </div>
        );
    }
}

export default Profile;