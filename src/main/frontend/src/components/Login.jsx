import React from "react";
import Profile from "./Profile";
import {Route} from "react-router";

class login extends React.Component {
    render() {
        const fail = () => {return(<h3>The username or password is incorrect</h3>);}
        return(
            <div className="window">
                <h3>Login form</h3>
                <form method="post" action="/auth/login">
                    <input type="text" placeholder="Login" name="username" className="logRegArea"></input>
                    <span style={{margin: 5}}></span>
                    <input type="password" placeholder="password" name="password" className="logRegArea"></input>
                    <button type="submit" className="button green">Sign In</button>
                    <Route path="/auth/login-error" component={fail} />
                </form>
            </div>
        );
    }
}

export default login;