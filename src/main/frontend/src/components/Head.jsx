import { Link } from "react-router-dom";

const Head = ({visiButtons}) => {
    return (
        <div className="header">
                <div typeof="text" className="str">
                    <h2 className="left_head">Sergei Leshchenko</h2>
                    <Link to="/register" className="right_text">
                        <a id="register" className="button purple" href="/register" style={{visibility: visiButtons}}>
                            <i className="fa fa-user-plus"></i>
                            <span>Зарегистрироваться</span>
                        </a>
                    </Link>
                    <Link to="/login" className="right_text">
                        <button id="login" className="button blue" style={{visibility: visiButtons}}>
                            <i className="fa fa-unlock"></i>
                            <span>Войти</span>
                        </button>
                    </Link>
                </div>
        </div>
    );
}

export default Head;