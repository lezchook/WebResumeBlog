import React from "react";
import axios from "axios";
import {NewPostEditor} from "./NewPostEditor";
import {KeyComp} from "./KeyComp";

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
        axios.get('http://192.168.1.33:8080/auth/info').then((response) => {this.setState({name: response.data})});
        axios.get('http://192.168.1.33:8080/user/posts').then((res) => this.setState({blogArr: res.data}));
        axios.get('http://192.168.1.33:8080/user/inform2').then((res) => this.setState({visi: res.data}));
        axios.get('http://192.168.1.33:8080/user/inform2rev').then((res) => this.setState({visiKey: res.data}));
    }

    componentDidUpdate() {
        axios.get('http://192.168.1.33:8080/user/posts').then((res) => this.setState({blogArr: res.data}));
    }

    state = {
        name: '',
        blogArr: posts,
        visi: '',
        visiKey: ''
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
                <h3>Welcome, {this.state.name}</h3>
                <NewPostEditor
                    posts={this.state.blogArr}
                    addNewPost={this.addNewPost}
                    visi={this.state.visi}
                />
                <KeyComp
                    visiKey={this.state.visiKey}
                />
                <form method="post" action="/auth/logout">
                    <button type="submit" className="button red">LogOut</button>
                </form>
            </div>
        );
    }
}

export default Profile;