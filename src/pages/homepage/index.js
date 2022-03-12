import React from 'react'
import './home-page.sass'
import iPhone from './images/iphone.png'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';

const Homepage = () => {
    return(
    <div className="landing">
        <div className="landing-wrapper">
            <div className="photo-wrapper">
                <img alt="iPhone" className="landing-photo" src={iPhone} />
            </div>
            <div className="landing-textbox">
                <h2 className="landing-title">
                    76 423 човека се приближиха
                    с 314 642 кг. към целта си
                </h2>
                <p>
                    Следете вашите калории, упражнения, 
                    биометрични и здравни данни.
                </p>
                <Button variant="contained">Започни сега!</Button>
                <Link to='/register'><button className="landing-btn">Започни сега!</button></Link>
                <p>Вече имате акаунт? <Link to='/login'>Влезте сега!</Link></p>
            </div>
        </div>
    </div>
    )
}

export default Homepage