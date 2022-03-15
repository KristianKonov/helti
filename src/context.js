import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'

const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const setUserContext = () => {
        if(Cookies.get('x-auth-token')) {
            const token = jwt_decode(Cookies.get('x-auth-token'))
            setLoading(false)
            setUserData({
                'id': token.id,
                'email': token.sub,
                'role': token.authorities[0].authority,
                'isEnabled': token.isEnabled,
                'isAuthenticated': true
            })
        }
        if(userData.isEnabled)
            setIsAuthenticated(true)
    }

    const logOut = () => {
        setUserData({})
        document.cookie = 'x-auth-token=; Max-Age=0; path=/; domain=';
        window.location.reload()
    }

    useEffect(() => {
        setUserContext()
    },[])

    return(
        <UserContext.Provider value={{
            userData, setUserData, logOut
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
    
export default UserContext