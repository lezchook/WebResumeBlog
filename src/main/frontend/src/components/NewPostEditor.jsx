import React from "react";
import axios from "axios";

export class NewPostEditor extends React.Component {
    constructor(props) {
        super(props);
        this.TitleChange = this.TitleChange.bind(this);
        this.DescChange = this.DescChange.bind(this);
    }

    state = {
        postTitle: "",
        postDesc: "",
    };

    createPost = () => {
        const post = {
            id: this.props.posts.length + 1,
            title: this.state.postTitle,
            description: this.state.postDesc,
            linked: false,
        }
        this.props.addNewPost(post);
        console.log(post);
        axios.post('http://localhost:8080/user/post', post);
    }

    TitleChange(event) {
        this.setState({postTitle: event.target.value,});
    }

    DescChange(event) {
        this.setState({postDesc: event.target.value,});
    }

    render() {
        return (
            <form>
                <div>
                    <input type="text" name="postTitle" onChange={this.TitleChange} value={this.state.postTitle}/>
                </div>
                <div>
                    <textarea name="postDescription" onChange={this.DescChange} value={this.state.postDesc}/>
                </div>
                <div>
                    <button type="button" onClick={this.createPost}>Add post</button>
                </div>
            </form>
        );
    }
}