import React from 'react'
import './home-page.sass'
import { BrowserRouter, Link } from 'react-router-dom'
import iPhone from './images/iphone.png'


const Homepage = () => {
    return(
        <div className="landing-wrapper">
            <div className="photo-wrapper">
                <img className="landing-photo" src={iPhone} />
            </div>
            <div className="landing-textbox">
                <h2 className="landing-title">
                    76 423 човека се приближиха
                    с 314 642 кг. към целта си
                </h2>
            </div>
        </div>

    )
}

export default Homepage