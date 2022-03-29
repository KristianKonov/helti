import React, { useContext } from 'react'
import './landing.sass'
import UserContext from '../../context'

const LandingPage = (props) => {
    const userData = useContext(UserContext)
    return(
        <>
            <div className={userData.isAuthenticated ? "landing-page-logged" : "landing-page"} >
                <div className="container">
                    {props.children}
                </div>
            </div>
            <div className="svg-container">
                <svg className="landing-svg" width="100%" height="100" viewBox="0 0 500 200" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="MyGradient">
                            <stop offset="0%" stopColor="rgba(2,25,91,1)" />
                            <stop offset="100%" stopColor="rgba(19,176,219,1)" />
                        </linearGradient>
                    </defs>
                    <path d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z" style={{stroke: 'none'}}></path>
                </svg>
            </div>
        </>
    )
}

export default LandingPage