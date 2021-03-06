import React, { useContext, useState, useEffect } from 'react'
import './home-page.sass'
import iPhone from './images/iphone.png'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button';
import UserContext from './../../context'
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CountUp from 'react-countup';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Helmet } from 'react-helmet-async';

const Homepage = () => {
    const [lastMeasurement, setLastMeasurement] = useState(null)
    const userData = useContext(UserContext)
    
    useEffect(() => {
        if(userData.userData?.biologicalData?.measurement !== null && userData.userData?.biologicalData?.measurement !== undefined){
            setLastMeasurement((new Date().getTime() - new Date(userData.userData.biologicalData.measurement.createdAt).getTime())/1000/60/60/24)
        }
    },[userData])
    return(
    <div className="landing">
        <Helmet>
            <title>Helti</title>
        </Helmet>
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
                    <div className="landing-welcome-message">
                        <h2>Радваме се да те видим отново,</h2>
                        <div>
                            <h2><span>{userData.userData.firstName + ' ' + userData.userData.lastName}</span>
                            <AccountCircleIcon className="accountIcon" /></h2>
                        </div>
                    </div>
                    {userData.userData.biologicalData?.measurement !== undefined && userData.userData?.biologicalData?.measurement !== null ?
                    lastMeasurement > 1 ? <p>Не сте се мерили от {parseInt(lastMeasurement)} {parseInt(lastMeasurement)  === 1 ? 'ден' : <p style={{display: 'inline'}}>дни! Премерете се и <span><Link to='/dashboard/changeBio'>въведете</Link></span> промените.</p>}</p> : <p>Вие сте на <span>4кг</span> от целта си</p> : 
                    <p>Все още не сте въвели <span>биологичните си данни</span>.</p>}
                    <Link to='/dashboard'><Button type="submit" variant="contained" endIcon={<PersonIcon />}>
                        Go to profile
                    </Button></Link>
                </div>
            </Paper>
        </Grid>
            : 
            <>
                <div className="landing-textbox">
                    <h2 className="landing-title">
                        <span className="counter"><CountUp useEasing end={76423} duration={3} /></span> човека се приближиха
                        с <span className="counter"><CountUp useEasing end={314642} duration={3} /></span> кг. към целта си
                    </h2>
                    <p>
                        Следете вашите калории, упражнения, 
                        биометрични и здравни данни.
                    </p>
                    <Link to='/register'><Button variant="contained">Започни сега!</Button></Link>
                    <p><span>Вече имате акаунт? <Link to='/login'>Влезте сега!</Link></span></p>
                    {/* <p>Вече имате акаунт? <Link to='/login'>Влезте сега!</Link></p> */}
                </div>
                <div className="photo-wrapper">
                    <img alt="iPhone" className="landing-photo" src={iPhone} />
                </div>
            </>
        }
        
        </div>
    </div>
    )
}

export default Homepage