import React, { useState, useContext }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context';
import Cookies from 'js-cookie'
import './login.sass'

import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const LoginPage = (props) => {
    const history = useNavigate()
    const [error, setError] = useState({
        'error': false,
        'message': ''
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let user = {}
    let loaded = false
    const userData = useContext(UserContext)

    const loginRequest = async () => {
        var axios = require('axios');
        var config = {
            method: 'post',
            url: 'http://localhost:8080/login',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            data: {'username': email, 'password': password}
        };
        try {
            const response = await axios(config)
            var token = response.headers.authorization
            token = token.split(' ')[1]
            document.cookie = `x-auth-token=${token}`
            var config2 = {
                method: 'get',
                url: 'http://localhost:8080/api/user',
                headers: { 
                    'accept': '*/*', 
                    'Authorization': 'Bearer ' + Cookies.get('x-auth-token')
                }
                };
                
                axios(config2)
                .then(function (response) {
                    userData.setUserData({
                        'id': response.data.id,
                        'email': response.data.email,
                        'role': response.data.role,
                        'firstName': response.data.firstName,
                        'lastName': response.data.lastName,
                        'biologicalData': response.data.biologicalDataVersion
                    })
                    userData.setIsAuthenticated(true)
                })
                .catch(function (error) {
                    console.log(error)
                    userData.setUserData({})
                    document.cookie = 'x-auth-token=; Max-Age=0; path=/; domain=';
                });
            loaded = true
            if(loaded)
                userData.setUserData(user)
            setTimeout(function() {
                history('/')
            }, 1000);
        } catch(err) {
            console.log(err.response)
            setError({'error': true, 'message': 'Check account and password!'})
        }
    }


    const loginSubmit = async (e) => {
        e.preventDefault()
        loginRequest()
        console.log()

    }

    return(
        <div className="container">
            <div className="login-page">
                <div className="login-form">
                    <form onSubmit={loginSubmit}>
                        <div className="login-welcome">
                            <h3>Welcome </h3>
                            <h3>back!</h3>
                        </div>
                        {error.error && 
                        <Stack sx={{ width: '100%' }} spacing={2}>
                            <Alert variant="outlined" severity="error">
                            {error.message}
                            </Alert>
                        </Stack>
                        }
                        <div className="input-div">
                            <label>
                                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
                            </label>
                        </div>
                        <div className="input-div">
                            <label>
                                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                            </label>
                        </div>
                        <div className="login-additional">
                            <p><Link to='/forgotten'>Забравена парола</Link></p>
                            <p>Нямате акаунт? <Link to='/register'>Регистрирай се!</Link></p>
                        </div>
                        <button className="login-submit-btn" type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage