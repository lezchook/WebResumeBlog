import React from "react";
import axios from "axios";

export class KeyComp extends React.Component {
    constructor(props) {
        super(props);
        this.KeyChange = this.KeyChange.bind(this);
    }

    state = {
        key: "",
        message: ""
    };

    createPost = () => {
        const key1 = this.state.key;
        axios.post('http://192.168.1.33:8080/user/key', key1).then(
            res => {axios.get('http://192.168.1.33:8080/user/keycheck/'+ key1).then(req => this.setState({message: req.data}))}
        );
    }

    KeyChange(event) {
        this.setState({key: event.target.value,});
    }

    render() {
        return (
            <form className="decor" style={{display: this.props.visiKey}}>
                <div className="form-inner">
                    <h4>Write key to get admin role</h4>
                    <input type="text" placeholder="Key" onChange={this.KeyChange}/>
                    <input type="button" value="Check" onClick={this.createPost}/>
                    <h4>{this.state.message}</h4>
                </div>
            </form>
        );
    }
}