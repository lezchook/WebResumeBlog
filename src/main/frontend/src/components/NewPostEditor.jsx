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
        visiEr: 'none'
    };

    createPost = () => {
        const post = {
            id: this.props.posts.length + 1,
            title: this.state.postTitle,
            description: this.state.postDesc,
            linked: false,
        }
        this.props.addNewPost(post);
        if (this.state.postTitle === '') {
            this.setState({visiEr: 'contents'});
        } else {
            this.setState({visiEr: 'none'});
            axios.post('http://192.168.1.33:8080/user/post', post);
        }
    }

    TitleChange(event) {
        this.setState({postTitle: event.target.value,});
    }

    DescChange(event) {
        this.setState({postDesc: event.target.value,});
    }

    render() {
        return (
            <form className="decor" style={{display: this.props.visi}}>
                <div className="form-inner">
                    <h3>Добавить пост</h3>
                    <input type="text" placeholder="Заголовок" onChange={this.TitleChange}/>
                    <textarea placeholder="Сообщение..." rows="3" onChange={this.DescChange}/>
                    <h4 style={{display: this.state.visiEr}}>Ошибка, отсуствует заголовок</h4>
                    <input type="button" value="Отправить" onClick={this.createPost}/>
                </div>
            </form>
        );
    }
}