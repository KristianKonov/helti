import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [userData, setUserData] = useState({})
    const [loading, setLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    const setUserContext = () => {
        var config = {
            method: 'get',
            url: 'http://localhost:8080/api/user',
            headers: { 
              'accept': '*/*', 
              'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
            }
          };
          
          axios(config)
          .then(function (response) {
                setUserData({
                    'id': response.data.id,
                    'email': response.data.email,
                    'role': response.data.appUserRole,
                    'firstName': response.data.firstName,
                    'lastName': response.data.lastName,
                    'isAuthenticated': true
                })
                setIsAuthenticated(true)
          })
          .catch(function (error) {
            console.log(error)
            setUserData({})
            document.cookie = 'x-auth-token=; Max-Age=0; path=/; domain=';
          });          
        // if(Cookies.get('x-auth-token')) {
        //     const token = jwt_decode(Cookies.get('x-auth-token'))
        //     setLoading(false)
        //     setUserData({
        //         'id': token.id,
        //         'email': token.sub,
        //         'role': token.authorities[0].authority,
        //         'isEnabled': token.isEnabled,
        //         'isAuthenticated': true
        //     })
        // }
        // if(userData.isEnabled)
        //     setIsAuthenticated(true)
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