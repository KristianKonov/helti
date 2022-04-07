
import React, { useState, useContext }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UserContext from '../../context';
import Cookies from 'js-cookie'
import './login.sass'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const LoginPage = (props) => {
    const history = useNavigate()
    const [visiblePassword, setVisiblePassword] = useState(false)
    const [backdrop, setBackdrop] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [error, setError] = useState({
        'error': false,
        'message': ''
    })
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const userData = useContext(UserContext)

    const loginRequest = () => {
        var config = {
            method: 'post',
            url: 'http://localhost:8080/login',
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*'
            },
            data: {'username': email, 'password': password}
        };
        axios(config)
        .then(response => {
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
                setBackdrop(true)
                console.log(backdrop, 'tuk si')
                userData.setUserData({
                    ...response.data
                })
                setTimeout(function() {
                    userData.setIsAuthenticated(true)
                    history('/')
                }, 2000);
            })
            .catch(function (error) {
                console.log(error)
                userData.setUserData({})
                document.cookie = 'x-auth-token=; Max-Age=0; path=/; domain=';
            });
        }).catch(err => {
            console.log(err.response)
            setError({'error': true, 'message': 'Check account and password!'})
        })
    }


    const loginSubmit = async (e) => {
        e.preventDefault()
        loginRequest()
    }

    const togglePassword = () => {
        setVisiblePassword(!visiblePassword)
    }

    return(
        <div className="container">
            <div className="login-page">
                    {backdrop && <Backdrop
                        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                        open={true}
                    >
                            <Grid item xs={12} md={4} lg={4}>
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                <div className="success-animation">
                                    <div className="greetings-message">
                                    <AccountCircleIcon />
                                    <h2><span>{userData.userData.firstName + ' ' + userData.userData.lastName}</span></h2>
                                    <p style={{opacity: .6}}>Успешно влязохте в акаунта си.</p>
                                    </div>
                                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                                        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                                        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                                    </svg>
                                </div>
                                </Paper>
                            </Grid>
                </Backdrop> }
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
                            <label className="login-show-password">
                                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type={visiblePassword ? "text": "password"} />
                                <VisibilityIcon onClick={togglePassword} />
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