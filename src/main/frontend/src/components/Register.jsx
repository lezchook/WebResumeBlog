import React from "react";
import axios from "axios";
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.usernameChange = this.usernameChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
    }

    state = {
        username: "",
        password: "",
        is: ""
    };

    ClickButton = () => {
        const user = {
            username: this.state.username,
            password: this.state.password,
        }
        if (user.username === '') {
            this.setState({is: 'Error, incorrect login'});
        } else {
            axios.post('http://192.168.1.33:8080/user/validat', user).then(() => {axios.get('http://192.168.1.33:8080/user/validate').then((res) => this.setState({is: res.data}))})
                .then(() => {axios.post('http://192.168.1.33:8080/auth/register', user)});
        }
    }

    usernameChange(event) {
        this.setState({username: event.target.value,});
    }

    passwordChange(event) {
        this.setState({password: event.target.value,});
    }

    render() {
        return(
                <div className="window">
                    <h3>Registration form</h3>
                    <input type="text" placeholder="Login" onChange={this.usernameChange} value={this.state.username} className="logRegArea"/>
                    <span style={{margin: 5}}></span>
                    <input type="password" placeholder="password" onChange={this.passwordChange} value={this.state.password} className="logRegArea"/>
                    <button type="button" onClick={this.ClickButton} className="button green">Sign Up</button>
                    <h3>{this.state.is}</h3>
                </div>
        );
    }
}

export default Register;
