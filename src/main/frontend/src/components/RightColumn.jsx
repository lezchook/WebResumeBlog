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
        </div>
    );
}

export default RightColumn;