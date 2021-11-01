import LoginComp from './Login';
import { Route } from "react-router";
import RegisterComp from './Register';
import Profile from "./Profile";

const RightColumn = () => {
    return(
        <div className="right_column">
            <Route path="/register" component={RegisterComp} />
            <Route path="/login" component={LoginComp} />
            <Route path="/auth/success" component={Profile} />
            <Route path="/auth/login-error" component={LoginComp} />
        </div>
    );
}

export default RightColumn;