import React from 'react';
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const logOut = () => {
        localStorage.setItem('userAutho', 'false');
        history.push("/")
    }
    return ((localStorage.getItem('rememberUser') === "true")
        ?
        <div>
            ESTE ES EL HOME
            <button onClick={logOut}>LogOut</button>
        </div>
        : <div>
            <Redirect to='/' />
        </div>

    );
};

export default Home;