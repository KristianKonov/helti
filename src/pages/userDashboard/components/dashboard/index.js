import React, {useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import UserContext from '../../../../context';
import './../../userDashboard.sass'
import Button from '@mui/material/Button';
import UserChart from './../../../../components/user_chart'

// SVG Import
import PersonFitnessTracker from './../../images/fitness_tracker.svg'

// Icons
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { Helmet } from 'react-helmet-async';

const UserDashboardPage = () => {
    const userData = useContext(UserContext)
    const location = useLocation();
    return(
        <>
            <Helmet>
                <title>Профил | Helti</title>
            </Helmet>
            <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    opacity: .9
                }}
                >
                    <UserChart />
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                    opacity: .9 
                }}
                >
                {userData.userData.firstName !== undefined ?
                <>
                    <div className="user-dashboard-flex-box">
                        <span className="user-dashboard-span">Добре дошъл,</span><h3>{userData.userData.firstName} {userData.userData.lastName}</h3>
                    </div>
                    {userData.userData.biologicalData?.age !== undefined ? 
                        <>
                        <ul className="user-dashboard-biodata">
                            <li>Възраст: <span>{userData.userData.biologicalData.age}</span></li>
                            <li>Подкожна мазнина: <span>{userData.userData.biologicalData.measurement.fatPercentage}</span></li>
                            <li>Височина: <span>{userData.userData.biologicalData.height}</span></li>
                            <li>Тегло: <span>{userData.userData.biologicalData.measurement.weight}</span></li>
                        </ul>
                        <Link to='settings/changebiodata'><Button variant="contained" endIcon={<EditIcon />}>
                            Промени
                        </Button></Link>
                        </>
                    :
                        <>
                            <p>Все още не сте добавили биологични данни и цели.</p>
                            <Link to='settings/addbiodata'><Button variant="contained" endIcon={<AddIcon />}>
                                Добави
                            </Button></Link>
                        </>
                    }
                </>
                : 'Loading...'}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', opacity: .9 }}>
                </Paper>
            </Grid>
            </Grid>
            <img src={PersonFitnessTracker} className="user-dashboard-vector" />
        </>
    )
}

export default UserDashboardPage