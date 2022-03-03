import React from 'react'
import { Link } from 'react-router-dom'
import './login.sass'

const LoginPage = () => {
    return(
        <div className="container">
            <div className="login-page">
                <div className="login-form">
                    <form>
                    <div className="login-welcome">
                        <h3>Welcome </h3>
                        <h3>back!</h3>
                    </div>
                    <div className="input-div">
                        <label>
                            <input placeholder="Email" type="email" />
                        </label>
                    </div>
                    <div className="input-div">
                        <label>
                            <input placeholder="Password" type="password" />
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