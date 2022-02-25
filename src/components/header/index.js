import React from 'react'
import logo from './../../logo.svg'
import './header.sass'


const Header = () => {
    return(
        <header>
            <div>
                <img className='logo' src={logo} />
            </div>
        </header>
    )
}

export default Header