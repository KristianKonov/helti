import React from 'react'
import './burger-nav.sass'

const BurgerNav = () => {
    return(
        <div className="burger-nav">
            <input type="checkbox" id="menu_checkbox" />
            <label className="burger-label" htmlFor="menu_checkbox">
            <div></div>
            <div></div>
            <div></div>
            </label>
        </div>
    )
}

export default BurgerNav