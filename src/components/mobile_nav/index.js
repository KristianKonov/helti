import React from 'react'
import { Link } from 'react-router-dom'
import './mobile_nav.sass'
import adjust from './../../images/icons/adjust.svg'

const MobileNavigation = ({themeToggler}) => {
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
    return(
        <div>
            
            {mobileLinks.map(nav => {
                return <li key={nav.pageName}><Link key={nav.pageName} to={nav.pageURL}>{nav.pageName}</Link></li>
            })}
            {/* <button className="mobile-switch-btn" onClick={themeToggler}><img alt="adjust" src={adjust} /></button> */}
            <img className={localStorage.getItem('theme') === 'dark' ? 'dark burger-img' : 'burger-img'} onClick={themeToggler} alt="adjust" src={adjust} />
        </div>
    )
}

export default MobileNavigation