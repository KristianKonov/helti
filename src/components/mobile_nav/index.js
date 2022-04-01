import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './mobile_nav.sass'
import adjust from './../../images/icons/adjust.svg'
import UserContext from '../../context'
import LogoutIcon from '@mui/icons-material/Logout';

const MobileNavigation = ({isLogged, navToggle, setNavToggle, navHandler, themeToggler}) => {
    const userData = useContext(UserContext)
    const mobileLinks = [
        {
            pageName: 'Начало',
            pageURL: '/'
        },
        {
            pageName: 'За нас',
            pageURL: '/about'
        },
        {
            pageName: 'Логин',
            pageURL: '/login'
        },
        {
            pageName: 'Регистрация',
            pageURL: '/register'
        }
    ]
    const loggedMobileLinks = [
        {
            pageName: 'Начало',
            pageURL: '/'
        },
        {
            pageName: 'За нас',
            pageURL: '/about'
        },
        {
            pageName: 'Профил',
            pageURL: '/dashboard'
        }
    ]
    if(isLogged) {
        return(
            <div>
                {loggedMobileLinks.map(nav => {
                    return <li key={nav.pageName}><Link onClick={navHandler} key={nav.pageName} to={nav.pageURL}>{nav.pageName}</Link></li>
                })}
                <div className="mobile-nav-icons">
                    <button className="mobile-logout-btn" onClick={userData.logOut}>Излез <LogoutIcon /></button>
                    <img className={localStorage.getItem('theme') === 'dark' ? 'dark burger-img' : 'burger-img'} onClick={themeToggler} alt="adjust" src={adjust} />
                </div>
            </div>
        )
    } else {
        return(
            <div>
                {mobileLinks.map(nav => {
                    return <li key={nav.pageName}><Link onClick={navHandler} key={nav.pageName} to={nav.pageURL}>{nav.pageName}</Link></li>
                })}
                {/* <button className="mobile-switch-btn" onClick={themeToggler}><img alt="adjust" src={adjust} /></button> */}
                <img className={localStorage.getItem('theme') === 'dark' ? 'dark burger-img' : 'burger-img'} onClick={themeToggler} alt="adjust" src={adjust} />
            </div>
        )
    }
}

export default MobileNavigation