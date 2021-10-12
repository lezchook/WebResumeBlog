import LoginComp from './Login';
import { Route } from "react-router";
import RegisterComp from './Register';

const RightColumn = () => {
    return(
        <div className="right_column">
           <Route path="/register" component={RegisterComp} />
           <Route path="/login" component={LoginComp} />
        </div>
    );
}

export default RightColumn;