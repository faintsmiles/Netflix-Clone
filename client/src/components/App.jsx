import { useState, useEffect } from 'react'
import { Link, useNavigate  } from 'react-router-dom'
import logo from '../images/netflix.png'
import ('../styles/App.css')

export default function App () {

    return (
        <div id="App">
            <div className='primary-card-container'>
                <Header />
                <PrimaryCardContent />
            </div>
        </div>
    )
}

function Header() {
    let navigate = useNavigate();

    return (
        <nav id='nav-bar'>
            <Link to="/"><img className='netflix' src={logo} alt="netflix" /></Link>
            <div className='nav-options'>
                <Link to='/signup'>
                    <u>Sign Up</u>
                </Link>
                <button className='sign-in' onClick={ () => { navigate('/login') }}>Sign In</button>
            </div>
        </nav>
    )
}

function PrimaryCardContent() {
    let navigate = useNavigate();

    const [email, setEmail] = useState('');
    
    useEffect(() => {
        document.cookie = `get-started-email=${email};max-age=604800;SameSite=Strict`;
    }, [email]);

    return(
        <div className='primary-card-content'>
            <div className='primary-card-content-container'>
                <h1>Unlimited movies, TV shows, and more.</h1>
                <h2>Watch anywhere. Cancel anytime.</h2>
                <section className='get-started'>
                    <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                    <form className='get-started-form' onSubmit={ (e) => { e.preventDefault(); navigate('/signup') }} >
                        <input  type='email' name='email' placeholder='Enter email' onChange={(e) => setEmail(e.currentTarget.value)} required />
                        <button type='submit'  >Get Started</button>
                    </form>
                </section>
            </div>
        </div>
    )
}

