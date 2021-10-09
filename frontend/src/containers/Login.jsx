import React from 'react';
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';

const Login = () => {
    // console.log("Prueba en otra pagina", localStorage.getItem('rememberUser'))
    const history = useHistory();

    const pageRedirect = () => {
        localStorage.getItem('rememberUser') === 'true'
            ? history.push("/Home")
            : alert("Ingresa tus datos")
    }
    return (
        <div>
            <button onClick={pageRedirect}>Enter</button>
        </div>
    );
};

export default Login;