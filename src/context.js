import React, {useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [userData, setUserData] = useState({})
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
            console.log(response)    
            setUserData({
                'id': response.data.id,
                'email': response.data.email,
                'role': response.data.role,
                'firstName': response.data.firstName,
                'lastName': response.data.lastName,
                'biologicalData': response.data.biologicalDataVersion
            })
            setIsAuthenticated(true)
        })
        .catch(function (error) {
            setUserData({})
            setIsAuthenticated(false)
            document.cookie = 'x-auth-token=; Max-Age=0; path=/; domain=';
        });
    }

    const logOut = () => {
        setUserData({})
        setIsAuthenticated(false)
        document.cookie = 'x-auth-token=; Max-Age=0; path=/; domain=';
        window.location.reload()
    }

    useEffect(() => {
        setUserContext()
    },[])

    return(
        <UserContext.Provider value={{
            userData, setUserData, logOut, isAuthenticated, setIsAuthenticated
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
    
export default UserContext