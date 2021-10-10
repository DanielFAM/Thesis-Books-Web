import React, { useState } from 'react';
import axios from 'axios'
import { Redirect, useHistory } from 'react-router-dom';
import '../styles/index.scss';

const Register = () => {
    const history = useHistory();


    const [userDataRegister, setUserDataRegister] = useState({
        username: '',
        email: '',
        password: ''
    })

    const changeData = (e) => { //Obtener datos del formulario y guardarlo en userData
        const { name, value } = e.target;
        setUserDataRegister({ ...userDataRegister, [name]: value })
    }

    const handleSubmit = (e) => { //ENviar datos al API
        e.preventDefault();
        if (userDataRegister.username === '' || userDataRegister.email === '' || userDataRegister.password === '') { //Validar campos vacios
            alert("Por favor ingrese todos los campos")
        } else {
            axios.post('http://localhost:5000/api/users/create/', {
                username: userDataRegister.username,
                email: userDataRegister.email,
                password: userDataRegister.password
            })
                .then(res => console.log(res))
                .then(history.push("/"))
                .catch(error => console.log(error))
        }
    }

    const urlImage = 'https://images.pexels.com/photos/3150550/pexels-photo-3150550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

    return ((localStorage.getItem('userAutho') === 'false')
        ?
        <div className='register'>
            <div className='register-formContent'>
                <form className='form' onSubmit={handleSubmit}>
                    <h2 className='form-title'>Register</h2>
                    <input className='form-input' type="text" name="username" onChange={changeData} placeholder='Username' />
                    <input className='form-input' type="email" name="email" onChange={changeData} placeholder='Email' />
                    <input className='form-input' type="password" name="password" onChange={changeData} placeholder='Password' />
                    <button className="waves-effect  orange lighten-1 btn form-button " type="submit">Send</button>
                </form>
            </div>
            <div className='register-imageContent' style={{ backgroundImage: `url(${urlImage})`, backgroundSize: 'cover' }}>
                <div className='register-imageText'>Welcome!!</div>
            </div>
        </div>
        :
        <div>
            <Redirect to='/Home' />
        </div>
    );
};

export default Register;