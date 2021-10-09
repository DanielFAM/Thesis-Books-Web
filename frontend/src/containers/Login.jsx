import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Login = () => {
    // console.log("Prueba en otra pagina", localStorage.getItem('rememberUser'))
    const history = useHistory();

    const [userData, setUserData] = useState({
        email:'',
        password:''
    })

    const changeData = (e) =>{ //OBtener datos del formulario y guardarlo en userData
        const {name, value} = e.target;
        setUserData({...userData, [name]:value})
    }

    const handleSubmit = (e) =>{ //ENviar datos al API
        e.preventDefault();
        if (userData.email === '' || userData.password === '') { //Validar campos vacios
            alert("FALTA UN CAMPO")
          } else {
            axios.post('http://localhost:5000/api/auth/signin', {
              email: userData.email,
              password: userData.password
            })
              .then(res => res.data)
              .then(data => localStorage.setItem('userAutho', data.token))
              .then(history.push("/Home"))
              .catch(error => console.log(error))
          }
    }

    if (localStorage.getItem('userAutho')){
        console.log("User isn't loged");
    }else{
        console.log("User Loged")
    }
    return (
        <div>
            {/* <button onClick={pageRedirect}>Enter</button> */}

            <form onSubmit={handleSubmit}>
                <span>Sign In</span>
                <input  type="email" name="email" onChange={changeData} placeholder='Email' />
                <input  type="password" name="password" onChange={changeData} placeholder='Password' />
                <button type="submit">Send</button>
                {/* <span>First time here? <Link to="/register" className='form-text_Secondary' >Log In</Link></span> */}
            </form>
        </div>
    );
};

export default Login;