import React from 'react'
import {Link} from 'react-router-dom'

const FooterNavigation = () => {
    const footernav = [
        {
            pageName: 'Terms and conditions',
            pageURL: '/terms'
        },
        {
            pageName: 'Terms and conditions',
            pageURL: '/terms'
        },
        {
            pageName: 'Terms and conditions',
            pageURL: '/terms'
        }

    ]

    return(
        footernav.map((nav, index) => {
            return <li key={index}><Link to={nav.pageURL}>{nav.pageName}</Link></li>
        })
    )
}

export default FooterNavigation