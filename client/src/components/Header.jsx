import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../images/netflix.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import  ('../styles/Header.css')


function Header () {
    let navigate = useNavigate();
    // Change nav color when scrolled past it's height 
    const [ navColor,  setNavColor] = useState('');

    // Open/Close collapsed menu options 
    const [ accMenu, setAccMenu ] = useState(false);
    const [ notifMenu, setNotifMenu ] = useState(false);
    const [ collapsedMenu, setCollapsedMenu ] = useState(false);
    
    // Logout method
    const logout = async () => {
        
        fetch('/logout', { credentials: 'include' })
        .then(() => navigate('/login'))
        .catch(() => {
            console.log("Fetch failed, setting redirectURL");
            navigate('/login')
        })
    }

    // Event listener that determines nav background color
    document.addEventListener('scroll', () => {
        if(window.scrollY >= 80) {
            setNavColor('navBlack')
        }
        else {
            setNavColor('');
        }
    })

    return (
    <>
        {/* Collapsed Nav  */}
        <div className='nav-container nav-collapsed nav'  >
            <span>
                <Link to="/">
                    <img className='netflix' src={logo} alt="netflix" />
                </Link>
            </span>
            <div className='dropdown nav-container   '>
                <button className='menu-button' onClick={() => setCollapsedMenu(!collapsedMenu) }>
                    Menu 
                </button>
                <div className='dropdown-content' style={{'display': collapsedMenu ? 'block' : 'none' }} onMouseLeave={()=> setCollapsedMenu(false)} >
                    <Link to="/">Notifications</Link>
                    <Link to="/">Account</Link>
                </div>
            </div>
        </div>
        {/* Expanded nav   */}
        <div className={`nav-container nav-expanded ${navColor}`}>
            <span>
                <Link to="/">
                    <img className='netflix' src={logo} alt="netflix" />
                </Link>
            </span>
            <nav className='nav'>
                <span>
                    <ul className='nav'>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/">TV Shows</Link></li>
                        <li><Link to="/">Movies</Link></li>
                        <li><Link to="/">New & Popular</Link></li>
                        <li><Link to="/">My List</Link></li>
                    </ul>
                </span>
                <span>
                    <ul className='nav'>
                        <li key={'search-bar'} ><input className='header-search' placeholder='Search...' type="text" /></li>
                        <div key={'notification-container'} className='expanded-nav-dropdown-container' >
                            <li key={'notication-icon'} className='clickable-icons' onClick={() => {setNotifMenu(!notifMenu); setCollapsedMenu(false); setAccMenu(false)   }} >
                                <FontAwesomeIcon className='icons' icon={regular('bell')} />
                            </li>
                            <div className='expanded-nav-dropdown' style={{'display': notifMenu ? 'block' : 'none'}} onMouseLeave={()=> setNotifMenu(false)}  >
                                <Link to="/">0 notifications</Link>
                            </div>
                        </div>
                        <div key={'account-container'} className='expanded-nav-dropdown-container'  >
                            <li key={'account-icon'} className='clickable-icons' onClick={() => {setAccMenu(!accMenu); setNotifMenu(false); setCollapsedMenu(false);   }} >
                                <FontAwesomeIcon className='icons ' icon={regular('user')} />
                            </li>
                            <div className='expanded-nav-dropdown' style={{'display': accMenu ? 'flex' : 'none'}} onMouseLeave={()=> setAccMenu(false)}   >
                                <Link to="/">Settings</Link>
                                <Link to='/' onClick={ (e) => { e.preventDefault(); logout() }}>Log out</Link>
                            </div>
                        </div>
                    </ul>
                </span>
            </nav>
        </div>
    </>
    )
}

export default Header;