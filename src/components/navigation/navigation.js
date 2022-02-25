import React from 'react'
import { Link } from 'react-router-dom'

const Navigation = () => {
    const navLinks = [
        {
            pageName: 'Home',
            pageURL: '/'
        },
        {
            pageName: 'Home',
            pageURL: '/'
        },
        {
            pageName: 'Home',
            pageURL: '/'
        },
        {
            pageName: 'Home',
            pageURL: '/'
        }
    ]
    return(
        {
            navLinks.map(nav => {
                return <li><Link to={pageURL}>{nav.pageName}</Link></li>
            })
        }
    )
}

export default Navigation