import { Link } from "react-router-dom";

const Head = () => {
    return (
        <div className="header">
            <div typeof="text" className="str">
                <h2 className="left_head">Sergei Leshchenko</h2>
                <Link to={`/login`} className="right_text">Войти в аккаунт</Link>
                <Link to={`/register`} className="right_text">Зарегистрироваться</Link>
            </div>
        </div>
    );
}

export default Head;