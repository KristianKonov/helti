import React from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../navigation/index'
import logo from './../../images/logo.svg'
import adjust from './../../images/icons/adjust.svg'
import './header.sass'


const Header = ({flag, themeToggler}, props) => {
    return(
        <header className={(flag ? "headerBg" : "")}>
            <div className="container">
                <div className="header-wrapper">
                    <div className="logo-wrapper">
                        <Link to='/'><img alt="Helti Logo" className='logo' src={logo} /></Link>
                    </div>
                    <div className="navigation">
                        <ul>
                            <Navigation />
                            <li>
                            <label className="switch">
                                <img alt="Light/Dark theme switcher" className="" src={adjust} />
                                <div>
                                    <input type="checkbox" />
                                    <span className="slider round"></span>
                                </div>
                            </label>
                            </li>
                            <button onClick={themeToggler}>Switch</button>
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header