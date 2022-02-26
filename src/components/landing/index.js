import React from 'react'
import './landing.sass'

const LandingPage = (props) => {
    return(
        <div className="landing-page">
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

export default LandingPage