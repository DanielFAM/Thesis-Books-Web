import React from 'react';
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Explorer = () => {
    const history = useHistory();

    const logOut = () => {
        localStorage.setItem('userAutho', 'false');
        history.push("/")
    }
    return ((localStorage.getItem('userAutho') !== 'false')
        ?
        <div>
            <div>HOLA BUSCA LO QUE DESEAS</div>
            <button onClick={logOut}>LogOut</button>
        </div>
        : <div>
            <Redirect to='/' />
        </div>

    );
};

export default Explorer;