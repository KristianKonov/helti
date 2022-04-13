import React from 'react'
import NotFoundIcon from './../../images/page_not_found.svg'

const DashboardNotFound = () => {
    return(
        <div className="dashboard-not-found">
            <h2 style={{fontSize: 42}}>Page not found!</h2>
            <img alt="not-found" src={NotFoundIcon} />
        </div>
    )
}

export default DashboardNotFound