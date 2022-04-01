import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../navigation/index'
import logo from './../../images/footer_logo.svg'
import './header.sass'
import UserContext from '../../context'
import MobileNavigation from './../mobile_nav/'
import './../mobile_nav/mobile_nav.sass'
import './../burger-menu/burger-nav.sass'
import adjust from './../../images/icons/adjust.svg'
import adminIcon from './../../images/icons/admin.svg'

const Header = ({flag, themeToggler}, props) => {
    const [navToggle, setNavToggle] = useState(false)
    const [loaded, setLoaded] = useState(false)
    const navHandler = () => {
        setNavToggle(!navToggle)
    }
    const userData = useContext(UserContext)
    if(userData.userData.role && !loaded) {
        setLoaded(true)
        return
    }
    const isLogged = userData.isAuthenticated
    return(
        <header className={(flag ? userData.isAuthenticated ? "header-auth" : 'headerBg' : "")}>
            <div className="container">
                <div className="header-wrapper">
                    <div className="logo-wrapper">
                        <Link to='/'><img alt="Helti Logo" className='logo' src={logo} /></Link>
                        {loaded && (userData.userData.role === 'ADMIN') ? (<Link to='/admin'><img className="admin-icon" src={adminIcon} alt="Admin" /></Link>) : null}
                        
                    </div>
                    <div className="navigation">
                        <ul className="navigation-ul">
                            <Navigation isLogged={isLogged} />
                            <img className={localStorage.getItem('theme') === 'dark' ? 'dark burger-img-pc' : 'burger-img-pc'} onClick={themeToggler} alt="adjust" src={adjust} />
                        </ul>
                        <div className="mobile-navigation">
                            <div className='burger-nav'>
                                <input type="checkbox" id="menu_checkbox" />
                                <label onClick={navHandler} className="burger-label" htmlFor="menu_checkbox">
                                <div></div>
                                <div></div>
                                <div></div>
                                </label>
                            </div>
                            <ul className={navToggle ? 'mobile-ul' : 'mobile-ul hidden'}>
                            <MobileNavigation isLogged={isLogged} navHandler={navHandler} navToggle={navToggle} setNavToggle={setNavToggle} themeToggler={themeToggler} />
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header