import React from "react";

class login extends React.Component {
    render() {
        return(
            <div className="window">
                <h3>Форма для входа</h3>
                <form method="post" action="/auth/login">
                    <input type="text" placeholder="Введите логин" name="username"></input>
                    <input type="password" placeholder="пароль" name="password"></input>
                    <button type="submit">Войти</button>
                </form>
            </div>
        );
    }
}

export default login;