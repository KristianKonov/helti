import React, {useContext} from 'react'
import { Link } from 'react-router-dom'
import './navigation.sass'
import UserContext from '../../context'

const Navigation = ({isLogged}) => {
    const userData = useContext(UserContext)
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
    const loggedLinks = [
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
            <>
                {loggedLinks.map(nav => {
                    return <li key={nav.pageName}><Link key={nav.pageName} to={nav.pageURL}>{nav.pageName}</Link></li>
                })}
                <button className="logout-btn" onClick={userData.logOut}>Логаут</button>
            </>
        )
    } else {
        return(
            navLinks.map(nav => {
                return <li key={nav.pageName}><Link key={nav.pageName} to={nav.pageURL}>{nav.pageName}</Link></li>
            })
        )
    }
}

export default Navigation