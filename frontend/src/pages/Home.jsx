import React, { useState, useEffect }  from 'react';
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import axios from 'axios'


const Home = () => {
    const history = useHistory();

    const logOut = () => {
        localStorage.setItem('userAutho', 'false');
        history.push("/")
    }

    const [user, setUser] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/users')
            .then(res => res.data)
            .then(data => { setUser(data) })
    }, []);

    console.log("USers", user)

    return ((localStorage.getItem('userAutho') !== 'false')
        ?
        <div>
            <button onClick={logOut}>LogOut</button>
        </div>
        : <div>
            {/* <Redirect to='/' /> */}
            {alert("INGRESE, POR FAVOR")}
        </div>

    );
};

export default Home;