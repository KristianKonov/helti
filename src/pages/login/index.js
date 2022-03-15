import React, { useState, useEffect, useContext }  from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode";
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
            console.log(response)
            var token = response.headers.authorization
            token = token.split(' ')[1]
            const decoded = jwt_decode(token)
            document.cookie = `x-auth-token=${token}`
            user = {
                'id': decoded.id,
                'email': decoded.sub,
                'role': decoded.authorities[0].authority,
                'isEnabled': decoded.isEnabled,
                'isAuthenticated': true
            }
            // setUserData({
            //     'email': decoded.sub,
            //     'role': decoded.authorities[0].authority
            // })
            loaded = true
            if(loaded)
                userData.setUserData(user)
            history('/')
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