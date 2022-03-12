import React, { isValidElement, useState } from 'react'
import { Link } from 'react-router-dom'
import './register.sass'

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [errorToggle, setErrorToggle] = useState(false)
    const [somethingEmpty, setSomethingEmpty] = useState(true)
    const [isNameEmpty, setIsNameEmpty] = useState(true)
    const [isEmailEmpty, setIsEmailEmpty] = useState(true)
    const [isPasswordEmpty, setIsPasswordEmpty] = useState(true)
    const [isRePasswordEmpty, setIsRePasswordEmpty] = useState(true)
    const [doesPasswordMatch, setDoesPasswordMatch] = useState(false)
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const [validMail, setValidMail] = useState(false)


    // const formValidator = () => {
    //     if (firstName === '' || lastName === '' || email === '' || password === '' || rePassword === '') {
    //         setSomethingEmpty(true)
    //         setErrorToggle(true)
    //         if(firstName !== '' && lastName !== '')
    //             setIsNameEmpty(false)
    //         if(email !== '')
    //             alert(email)
    //             setIsEmailEmpty(false)
    //         if(password !== '')
    //             setIsPasswordEmpty(false)
    //         if(rePassword !== '')
    //             setIsRePasswordEmpty(false)
    //         setErrorToggle(true)
    //     }
    //     else {
    //         setSomethingEmpty(false)
    //         if (rePassword !== password)
    //             setDoesPasswordMatch(false)
    //     }

    //     if(email.match(mailformat)) {
    //         setValidMail(true)
    //     } else {
    //         setValidMail(false)
    //     } 
    // }

    const registerHandler = (e) => {
        e.preventDefault()
        

        var axios = require('axios');

        // axios.post('http://localhost:8000/api/register', {'email': email, 'firstName': firstName, 'lastName': lastName, 'password': password})
        // .then(response => {
        //     console.log(response.data);
        // })
        // .catch(error => {
        //     console.log(error.data)
        // })


        axios.post('http://localhost:8080/api/registration/register', {'email': email, 'firstName': firstName, 'lastName': lastName, 'password': password})
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error.data)
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
                    {errorToggle && 
                        <div className="register-error">
                            <h3>Грешка при регистриране!</h3>
                            <ul>
                                {isNameEmpty && <li>Моля въведете име</li>}
                                {!validMail && <li>Моля въведете валидна електронна поща</li>}
                                {isEmailEmpty && <li>Моля въведете електронна поща</li>}
                                {isPasswordEmpty && <li>Моля въведете проверете паролата</li>}
                                {!doesPasswordMatch && <li>Паролите не съвпадат</li>}
                            </ul>
                        </div>
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