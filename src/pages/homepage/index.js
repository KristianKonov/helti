import React, { useContext } from 'react'
import './home-page.sass'
import iPhone from './images/iphone.png'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import UserContext from './../../context'
import PersonIcon from '@mui/icons-material/Person';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const Homepage = () => {
    const userData = useContext(UserContext)
    console.log(userData)
    return(
    <div className="landing">
        <div className="landing-wrapper">
            {userData.isAuthenticated ? 
            <Grid item xs={12} md={12} lg={12}>
            <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    background: 'rgba(0,0,0,.2)',
                    flexDirection: 'column',
                    padding: '20px'
                }}
            >
                <div className="landing-authenticated">
                    <h1>Радваме се да те видим отново, {userData.userData.firstName + ' ' + userData.userData.lastName}</h1>
                    {userData.userData.biologicalData?.age ? <p>Вие сте на <span>4кг</span> от целта си</p> : <p>Все още не сте въвели <span>биологичните си данни</span>.</p>}
                    <Link to='/dashboard'><Button type="submit" variant="contained" endIcon={<PersonIcon />}>
                        Go to profile
                    </Button></Link>
                </div>
            </Paper>
        </Grid>
            : 
            <>
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
                    <Link to='/register'><Button variant="contained">Започни сега!</Button></Link>
                    {/* <p>Вече имате акаунт? <Link to='/login'>Влезте сега!</Link></p> */}
                </div>
            </>
        }
            
        </div>
    </div>
    )
}

export default Homepage