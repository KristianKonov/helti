import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '../navigation/navigation'
import logo from './../../logo.svg'
import './header.sass'


const Header = () => {
    return(
        <header>
            <div>
                <BrowserRouter>
                    <img className='logo' src={logo} />
                    <div className="navigation">
                        <ul>
                            <Navigation />
                        </ul>
                    </div>
                </BrowserRouter>
            </div>
        </header>
    )
}

export default Header