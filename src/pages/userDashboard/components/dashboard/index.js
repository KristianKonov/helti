import React, {useContext} from 'react'
import { Link, useLocation } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import UserContext from '../../../../context';
import './../../userDashboard.sass'
import Button from '@mui/material/Button';
import UserChart from './../../../../components/user_chart'

// Icons
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const UserDashboardPage = () => {
    const userData = useContext(UserContext)
    const location = useLocation();
    
    console.log('first one', userData.userData.biologicalData)
    console.log('second one', userData.userData.measurements)
    return(
        <>
            <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={8}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
                >
                    <UserChart />
                </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={4}>
                <Paper
                sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                }}
                >
                {userData.userData.firstName !== undefined ?
                <>
                    <h3>Добре дошъл, {userData.userData.firstName} {userData.userData.lastName}</h3>
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
            {/* Recent Orders */}
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                </Paper>
            </Grid>
            </Grid>
        </>
    )
}

export default UserDashboardPage