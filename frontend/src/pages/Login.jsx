import React, { useState } from 'react';
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import '../styles/index.scss';
import { GoogleLogin } from 'react-google-login';

// import M from 'materialize-css';

const Login = () => {

    async const responseGoogle = (respuesta) => {
        console.log(respuesta)
        console.log(respuesta.tokenId);
        console.log(respuesta.profileObj);

        axios({
            method: "POST",
            url: "http://localhost:5000/api/auth/googleLogin",
            data: { tokenId: respuesta.tokenId }
        }).then(res => console.log(res));
    }

    return (
        <GoogleLogin
            clientId="825534615979-g87f8lf5ssvnch65gqj8fdjk1rbqe8ei.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
        />
    )


    // const history = useHistory();

    // const [userData, setUserData] = useState({
    //     email: '',
    //     password: ''
    // })

    // const changeData = (e) => { //Obtener datos del formulario y guardarlo en userData
    //     const { name, value } = e.target;
    //     setUserData({ ...userData, [name]: value })
    // }

    // const handleSubmit = (e) => { //ENviar datos al API
    //     e.preventDefault();
    //     if (userData.email === '' || userData.password === '') { //Validar campos vacios
    //         alert("FALTA UN CAMPO")
    //     } else {
    //         axios.post('http://localhost:5000/api/auth/signin', {
    //             email: userData.email,
    //             password: userData.password
    //         })
    //             .then(res => res.data)
    //             .then(data => localStorage.setItem('userAutho', data.token))
    //             .then(history.push("/Home"))
    //             .catch(error => console.log(error))
    //     }
    // }

    // const urlImage = 'https://images.pexels.com/photos/3728085/pexels-photo-3728085.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

    // return (
    //     <div className='register'>
    //         <div className='register-imageContent' style={{ backgroundImage: `url(${urlImage})`, backgroundSize: 'cover' }}>
    //             <div className='register-imageText'>Welcome!!</div>
    //         </div>
    //         <div className='register-formContent'>
    //             <form className='form' onSubmit={handleSubmit}>
    //                 <h2 className='form-title'>Ingresa</h2>
    //                 <input className='form-input' type="email" name="email" onChange={changeData} placeholder='Email' />
    //                 <input className='form-input' type="password" name="password" onChange={changeData} placeholder='Password' />
    //                 <button className="waves-effect  orange lighten-1 btn form-button " type="submit">Send</button>
    //                 <span>First time here? <Link to="/register" className='form-text_Secondary' >Log In</Link></span>
    //             </form>
    //         </div>

    //     </div>

    // );


};

export default Login;