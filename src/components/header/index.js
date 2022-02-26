import React from 'react'
import { BrowserRouter, Link } from 'react-router-dom'
import LandingPage from '../landing'
import Navigation from '../navigation/navigation'
import logo from './../../images/logo.svg'
import './header.sass'


const Header = ({flag}) => {
    console.log(flag)
    return(
        <header className={(flag ? "headerBg" : "")}>
            <div className="container">
                <div className="header-wrapper">
                    <div className="logo-wrapper">
                        <Link to='/'><img className='logo' src={logo} /></Link>
                    </div>
                    <div className="navigation">
                        <ul>
                            <Navigation />
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header