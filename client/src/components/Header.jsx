import { useState } from 'react';
import logo from '../images/netflix.png';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import  ('../styles/Header.css')


function Header () {

    // Change nav color when scrolled past it's height 
    const [ navColor,  setNavColor] = useState('');

    // Open/Close collapsed menu options 
    const [ accMenu, setAccMenu ] = useState(false);
    const [ notifMenu, setNotifMenu ] = useState(false);
    const [ collapsedMenu, setCollapsedMenu ] = useState(false);
    
    // Logout method
    const logout = async () => {

        fetch('/logout', { credentials: 'include' })
        .then(() => window.location.href ='/login')
        .catch(() => {
            console.log("Fetch failed, setting redirectURL");
            window.location.href = '/login'
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
                <a href="/">
                    <img className='netflix' src={logo} alt="netflix" />
                </a>
            </span>
            <div className='dropdown nav-container   '>
                <button className='menu-button' onClick={() => setCollapsedMenu(!collapsedMenu) }>
                    Menu 
                </button>
                <div className='dropdown-content' style={{'display': collapsedMenu ? 'block' : 'none' }} onMouseLeave={()=> setCollapsedMenu(false)} >
                    <a href="/">Notifications</a>
                    <a href="/">Account</a>
                </div>
            </div>
        </div>
        {/* Expanded nav   */}
        <div className={`nav-container nav-expanded ${navColor}`}>
            <span>
                <a href="/">
                    <img className='netflix' src={logo} alt="netflix" />
                </a>
            </span>
            <nav className='nav'>
                <span>
                    <ul className='nav'>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">TV Shows</a></li>
                        <li><a href="/">Movies</a></li>
                        <li><a href="/">New & Popular</a></li>
                        <li><a href="/">My List</a></li>
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
                                <a href="/">0 notifications</a>
                            </div>
                        </div>
                        <div key={'account-container'} className='expanded-nav-dropdown-container'  >
                            <li key={'account-icon'} className='clickable-icons' onClick={() => {setAccMenu(!accMenu); setNotifMenu(false); setCollapsedMenu(false);   }} >
                                <FontAwesomeIcon className='icons ' icon={regular('user')} />
                            </li>
                            <div className='expanded-nav-dropdown' style={{'display': accMenu ? 'flex' : 'none'}} onMouseLeave={()=> setAccMenu(false)}   >
                                <a href="/">Settings</a>
                                <a href='/' onClick={ (e) => { e.preventDefault(); logout() }}>Log out</a>
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