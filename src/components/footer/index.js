import React from 'react'
import FooterNavigation from '../footer_navigation'
import FooterLogo from './../../images/footer_logo.svg'
import { Link } from 'react-router-dom'
import './footer.sass'

const Footer = () => {
    return(
        <>
            <div className="footer-svg-container">
                <svg className="footer-svg" width="100%" height="100" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="FooterGradient">
                            <stop offset="0%" stopColor="rgba(19,176,219,1)" />
                            <stop offset="100%" stopColor="rgba(2,25,91,1)" /> 
                        </linearGradient>
                    </defs>
                    <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none'}}></path>
                </svg>
            </div>
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
        </>
    )
}

export default Footer