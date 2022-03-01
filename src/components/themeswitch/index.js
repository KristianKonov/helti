import React from 'react'
import adjust from './../../images/icons/adjust.svg'

const ThemeSwitch = () => {
    return(
        <label className="switch">
            <img alt="Light/Dark theme switcher" src={adjust} />
            <div>
                <input type="checkbox" />
                <span className="slider round"></span>
            </div>
        </label>
    )
}

export default ThemeSwitch