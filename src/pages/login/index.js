import React from 'react'
import './login.sass'

const LoginPage = () => {
    return(
        <div className="container">
            <div className="login-page">
                <div className="login-form">
                    <form>
                    <div className="login-welcome">
                        <h3>Welcome</h3>
                        <h3>back!</h3>
                    </div>
                    <div className="input-div">
                        <label>
                            Email:
                            <input type="email" />
                        </label>
                    </div>
                    <div className="input-div">
                        <label>
                            Password:
                            <input type="password" />
                        </label>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage