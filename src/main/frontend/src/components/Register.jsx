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
        axios.post('http://192.168.1.14:8080/user/validat', user).then(() => {axios.get('http://192.168.1.14:8080/user/validate').then((res) => this.setState({is: res.data}))})
            .then(() => {axios.post('http://192.168.1.14:8080/auth/register', user)});
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
                    <h3>Форма для регистрации</h3>
                    <input type="text" placeholder="Введите логин" onChange={this.usernameChange} value={this.state.username}/>
                    <input type="password" placeholder="пароль" onChange={this.passwordChange} value={this.state.password}/>
                    <button type="button" onClick={this.ClickButton}>Зарегистрироваться</button>
                    <h3>{this.state.is}</h3>
                </div>
        );
    }
}

export default Register;