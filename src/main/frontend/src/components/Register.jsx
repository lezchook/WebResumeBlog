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
    };

    ClickButton = () => {
        const user = {
            username: this.state.username,
            password: this.state.password,
        }
        axios.post('http://localhost:8080/auth/register', user);
        console.log(user)
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
                    <input type="text" placeholder="Введите логин" onChange={this.usernameChange} value={this.state.username}></input>
                    <input type="password" placeholder="пароль" onChange={this.passwordChange} value={this.state.password}></input>
                    <button type="button" onClick={this.ClickButton}>Зарегистрироваться</button>
                </div>
        );
    }
}

export default Register;