import React from 'react'
import { Link } from 'react-router-dom'
import './admin.sass'

const AdminPage = ({theme, setTheme, themeToggler}, props) => {
    const adminLinks = [
        {
            linkName: 'Overviewadad',
            componentName: 'overview',
            id: 0
        },
        {
            linkName: 'Overview',
            componentName: '<Overview />',
            id: 1
        },
        {
            linkName: 'Overview',
            componentName: '<Overview />',
            id: 2
        },
        {
            linkName: 'Overview',
            componentName: '<Overview />',
            id: 3
        },
        {
            linkName: 'Overview',
            componentName: '<Overview />',
            id: 4
        }
    ]

    return(
        <div className="admin-page">
            <div className="admin-navigation">
                <ul>
                    {
                        adminLinks.map((link, index) => {
                            return <Link key={index} to={`/admin/${link.componentName}`}><li key={link.id}>{link.linkName}</li></Link>
                        })
                    }
                </ul>
            </div>
            <div className="admin-dashboard">
                {props.children}
                <h3>asd</h3>
            </div>
        </div>
    )
}

export default AdminPage