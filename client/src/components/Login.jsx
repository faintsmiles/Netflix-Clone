import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

import netflix from '../images/netflix.png';

import ('../styles/Login.css')

export default function Login(){

    const location = useLocation();

    const navigate = useNavigate();
    const [ formData, setFormData ] = useState('');

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData( values => ({...values, [name]: value}));
    }


    const formSubmit = (event) => {
        event.preventDefault();

        fetch('/login' , {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'             
            },
            body: JSON.stringify(formData)
        })
        .then((result) => result.json())
        .then((data) => navigate(data.redirectURL))
        .catch((error) => console.error(error))
        
        return;
}

    return(
        <div id='login'>
            <div className='header-container'>
                <Link to={'/'}>
                    <img className='netflix' src={netflix} alt="" />
                </Link>
            </div>
            {/*  Rewrite this into a messageState for both redirects/failed logins */}
            <h1> { location.state != null ? location.state.message : "" }</h1>
            
            <form id='login-form' action='/login' method='POST' onSubmit={formSubmit}>
                <h1>Sign In</h1>
                <label htmlFor='email'>Email: </label>
                <input id='email' type='email' name='email' placeholder='Please enter your email' value={formData.email || ''} onChange={handleChange} />
                <label form='password'>Password:</label>
                <input type='password' name='password' placeholder='Please enter your password.' value={formData.password || ''} onChange={handleChange}/>
                <br/>
                <button type='Submit'>Sign In</button>
            </form>
        </div>
    )
}

