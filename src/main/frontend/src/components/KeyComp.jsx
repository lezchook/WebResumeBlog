import React from "react";
import axios from "axios";

export class KeyComp extends React.Component {
    constructor(props) {
        super(props);
        this.KeyChange = this.KeyChange.bind(this);
    }

    state = {
        key: ""
    };

    createPost = () => {
        const key1 = this.state.key;
        axios.post('http://192.168.1.33:8080/user/key', key1);
    }

    KeyChange(event) {
        this.setState({key: event.target.value,});
    }

    render() {
        return (
            <form className="decor" style={{display: this.props.visiKey}}>
                <div className="form-inner">
                    <h3>Чтобы стать админом, введите ключ</h3>
                    <input type="text" placeholder="Ключ" onChange={this.KeyChange}/>
                    <input type="button" value="Отправить" onClick={this.createPost}/>
                </div>
            </form>
        );
    }
}