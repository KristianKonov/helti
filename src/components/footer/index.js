import React from 'react'
import FooterNavigation from '../footer_navigation'
import FooterLogo from './../../images/footer_logo.svg'
import { Link } from 'react-router-dom'
import './footer.sass'

const Footer = () => {
    return(
        <footer>
            <div className="container">
                <div className="footer-wrapper">
                    <div className="footer-logo">
                        <Link to='/'><img alt="Footer Helti Logo" src={FooterLogo} /></Link>
                    </div>
                    <div className="footer-nav">
                        <ul>
                            <FooterNavigation />
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer