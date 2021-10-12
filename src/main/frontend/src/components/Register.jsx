import React from "react";
class Register extends React.Component {

    render() {
        return(
            <form method="post" action="/auth/register">
                <div className="window">
                    <h3>Форма для регистрации</h3>
                    <input type="text" placeholder="Введите логин"></input>
                    <input type="password" placeholder="пароль"></input>
                    <button type="submit">Зарегистрироваться</button>
                </div>
            </form>
        );
    }
}

export default Register;