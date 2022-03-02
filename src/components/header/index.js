import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../navigation/index'
import logo from './../../images/logo.svg'
import './header.sass'
import MobileNavigation from './../mobile_nav/'
import './../mobile_nav/mobile_nav.sass'
import './../burger-menu/burger-nav.sass'
import adjust from './../../images/icons/adjust.svg'

const Header = ({flag, themeToggler}, props) => {
    const [navToggle, setNavToggle] = useState(false)
    const navHandler = () => {
        setNavToggle(!navToggle)
    }
    return(
        <header className={(flag ? "headerBg" : "")}>
            <div className="container">
                <div className="header-wrapper">
                    <div className="logo-wrapper">
                        <Link to='/'><img alt="Helti Logo" className='logo' src={logo} /></Link>
                    </div>
                    <div className="navigation">
                        <ul className="navigation-ul">
                            <Navigation />
                            <img className={localStorage.getItem('theme') === 'dark' ? 'dark burger-img-pc' : 'burger-img-pc'} onClick={themeToggler} alt="adjust" src={adjust} />
                        </ul>
                        <div className="mobile-navigation">
                            <ul className="mobile-ul">
                            <div className="burger-nav">
                                <input type="checkbox" id="menu_checkbox" />
                                <label onClick={navHandler} className="burger-label" htmlFor="menu_checkbox">
                                <div></div>
                                <div></div>
                                <div></div>
                                </label>
                            </div>
                            {navToggle && <MobileNavigation themeToggler={themeToggler} />}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header