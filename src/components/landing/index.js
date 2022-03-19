import React, { useContext } from 'react'
import './landing.sass'
import UserContext from '../../context'

const LandingPage = (props) => {
    const userData = useContext(UserContext)
    return(
        <div className={userData.isAuthenticated ? "landing-page-logged" : "landing-page"} >
            <div className="container">
                {props.children}
            </div>
        </div>
    )
}

export default LandingPage