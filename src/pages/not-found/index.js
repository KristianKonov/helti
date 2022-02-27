import React from 'react'
import './not-found.sass'
import ImageNotFound from './images/404Page.svg'

const NotFound = () => {
    return(
        <div className="not-found">
            <img className="not-found-image" alt="Error 404: Page not found" src={ImageNotFound} />
            <div className="not-found-text">
                <h3>Error: Page not found</h3>
                <p>Navigate to other page</p>
            </div>
        </div>
    )
}

export default NotFound