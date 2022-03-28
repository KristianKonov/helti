import React from 'react'
import {Link} from 'react-router-dom'

const FooterNavigation = () => {
    const footernav = [
        {
            pageName: 'Често задавани въпроси',
            pageURL: '/faq'
        },
        {
            pageName: 'Контакти',
            pageURL: '/contact-us'
        },
        {
            pageName: 'Общи условия за ползване',
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