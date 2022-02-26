import React from 'react'
import { Link } from 'react-router-dom'
import './navigation.sass'

const Navigation = () => {
    const navLinks = [
        {
            pageName: 'Начало',
            pageURL: '/',
            pageID: '1'
        },
        {
            pageName: 'За нас',
            pageURL: '/about',
            pageID: '2'
        },
        {
            pageName: 'Логин',
            pageURL: '/',
            pageID: '3'
        },
        {
            pageName: 'Регистрация',
            pageURL: '/',
            pageID: '4'
        }
    ]
    return(
        navLinks.map(nav => {
            return <li key={nav.pageName}><Link key={nav.pageName} to={nav.pageURL}>{nav.pageName}</Link></li>
        })
    )
}

export default Navigation