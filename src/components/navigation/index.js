import React from 'react'
import { Link } from 'react-router-dom'
import './navigation.sass'

const Navigation = () => {
    const navLinks = [
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
        navLinks.map(nav => {
            return <li key={nav.pageName}><Link key={nav.pageName} to={nav.pageURL}>{nav.pageName}</Link></li>
        })
    )
}

export default Navigation