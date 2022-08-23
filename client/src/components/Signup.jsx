import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import netflix from '../images/netflix.png';


import ('../styles/Signup.css')

export default function Signup(props) {

    const navigate = useNavigate();

    //In the event we were directed by the 'Get Started Button' from index page, we check for email to populate form with.
    const email = document.cookie.split(`${'get-started-email='}`).pop();

    const [ formData, setFormData ] = useState({ 'email' : email});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(values => ({...values, [name]: value}));
    }

    const checkPasswords = () => {
        return formData.password === formData.confirmPassword;
    }
    const formSubmit = (event) => {
        event.preventDefault();

        if(checkPasswords()) {
            fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then((result) => result.json())
            .then((data) => navigate(data.redirectURL))
            .catch((error) => console.error(error))
    }
    return;
}

    return (
        <div id='signup' >
            <div className='header-container'>
                <a href={'/'}>
                    <img className='netflix' src={netflix} alt="" />
                </a>
            </div>
            <form id='signup-form' action='/signup' method='POST' onSubmit={formSubmit}>
                <h1>Sign Up</h1>
                <label htmlFor='email'>Email:</label>
                <input id='email' name='email' type="email" placeholder='Email' value={ formData.email || email } onChange={handleChange} required />  
                <label htmlFor='password'>Password:</label>
                <input id='password' name='password' type="password" autoComplete='new-password' placeholder='Password' minLength={6} value={formData.password || ''} onChange={handleChange} required/>
                <label htmlFor='password'>Confirm Password:</label>
                <input id='confirmPassword' name='confirmPassword' type="password" placeholder='Confirm password' minLength={6} title='Passwords must match' value={formData.confirmPassword || ''} onChange={ e => {handleChange(e); checkPasswords(e)}} required />
                { 
                    formData.confirmPassword && !checkPasswords() && 
                    <span className='warning' >Passwords must match!</span>
                }
                <button type='Submit'>Sign Up</button>

            </form>
        </div>
  )
}
