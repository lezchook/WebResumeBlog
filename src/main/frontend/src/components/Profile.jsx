import React, {useState} from "react";
import Axios from "axios";

function Profile() {
    const [joke, setJoke] = useState("");

    const getJoke = () => {
        Axios.get('http://localhost:8080/auth/info').then((response) => {setJoke(response.data)})
    }

    getJoke();

    return(
        <div className="window">
            <h3>Добро пожаловать, {joke}</h3>
            <form method="post" action="/auth/logout">
                <button type="submit">LogOut</button>
            </form>
        </div>
    );
}

export default Profile;