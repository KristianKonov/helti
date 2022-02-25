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
            pageURL: '/'
        },
        {
            pageName: 'Логин',
            pageURL: '/'
        },
        {
            pageName: 'Регистрация',
            pageURL: '/'
        }
    ]
    return(
        navLinks.map(nav => {
            return <li><Link key={nav.pageName} to={nav.pageURL}>{nav.pageName}</Link></li>
        })
    )
}

export default Navigation