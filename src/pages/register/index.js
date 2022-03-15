import React, { isValidElement, useState } from 'react'
import { Link } from 'react-router-dom'
import './register.sass'


import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const [error, setError] = useState({
        'error': false,
        'message': ''
    })
    const [success, setSuccess] = useState({
        'status': false,
        'message': ''
    })
    const [serverError, setServerError] = useState(null)
    const registerHandler = (e) => {
        e.preventDefault()

        const validateForm = () => {
            if((password !== '' && rePassword !== '') &&
            (password === rePassword) &&
            (firstName !== '' && lastName !== '')) {
                setError({'error': false, 'message': ''})
                registerRequest()
            }
        }
        if(firstName === '' || lastName === '')
            setError({'error': true, 'message': 'Enter your name!'})
            
        if(email === '')
            setError({'error': true, 'message': 'Enter email!'})

        if(password === '' || rePassword === '') {
            setError({'error': true, 'message':'Enter password!'})
        }
        if(password !== rePassword) {
            setError({'error': true, 'message':'Passwords do not match!'})
            console.log(error)
        }
        validateForm()
    }

    const registerRequest = () => {
        var axios = require('axios');
        axios.post('http://localhost:8080/api/registration/register', {'email': email, 'firstName': firstName, 'lastName': lastName, 'password': password})
        .then(response => {
            setSuccess({'status': true, 'message': "Thank you for the registration! Email confirmation sent at "+email+"! Confirmation link will be active for the next 2 hours!"})
        })
        .catch(error => {
            setError({'error': true, 'message': error.response.data.message})
        })
    }

    return(
        <div className="container">
            <div className="register-page">
                <div className="register-form">
                    <form onSubmit={registerHandler}>
                    <div className="register-welcome">
                        <h3>Register </h3>
                        <h3>now!</h3>
                    </div>
                    {error.error && 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="error">
                        {error.message}
                        </Alert>
                  </Stack>
                    }
                    {success.status && 
                    <Stack sx={{ width: '100%' }} spacing={2}>
                        <Alert variant="outlined" severity="success">
                        {success.message}
                        </Alert>
                  </Stack>
                    }
                    <div className="input-div">
                        <label>
                            <input  maxLength='20' value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" type="text" />
                        </label>
                    </div>
                    <div className="input-div">
                        <label>
                            <input  maxLength='20' value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" type="text" />
                        </label>
                    </div>
                    <div className="input-div">
                        <label>
                            <input  maxLength='40' value={email} pattern=".+@.+.+" onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email" />
                        </label>
                    </div>
                    <div className="input-div">
                        <label>
                            <input  value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password" />
                        </label>
                    </div>
                    <div className="input-div">
                        <label>
                            <input  value={rePassword} onChange={(e) => setRePassword(e.target.value)} placeholder="Confirm password" type="password" />
                        </label>
                    </div>
                    <div className="register-additional">
                        <p>Вече имате акаунт? <Link to='/login'>Логни се!</Link></p>
                    </div>
                    <button className="register-submit-btn" type="submit">Register</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage