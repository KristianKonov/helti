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
        const temp = response.data
        setUserData({
            ...temp
        })
            console.log(response.data)
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
        document.location.href="/";
        // window.location.reload()
    }

    useEffect(() => {
        if(Cookies.get('x-auth-token')) {
            setUserContext()
        }
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