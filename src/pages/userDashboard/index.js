import React from 'react'
import './userDashboard.sass'
import UserDashboardNavigation from './dashboardList';
import { List } from '@mui/material';
import { Routes, Route } from 'react-router-dom'
import UserDashboardPage from './components/dashboard';
import ChangeNamePage from './components/changeName';
import AddBiologicalData from './components/addBio';
import EditBiologicalData from './components/changeBio';
import DeactivateAccountPage from './components/deactivate';
import MealGeneratorPage from './components/mealGenerator';
import ChangePasswordPage from './components/changePassword';

const UserDashboard = () => {
    return(
        <div className="user-dashboard-wrapper">
            <div className="user-dashboard-nav">
                <List component="nav">
                    <UserDashboardNavigation />
                </List>
            </div>
            <div className='user-dashboard-body'>
                <Routes>
                    <Route exact path='/' element={
                        <UserDashboardPage />
                    } />
                    <Route exact path='/meal-generator' element={
                        <>
                            <MealGeneratorPage />
                        </>
                    } />
                    <Route exact path='/trainers' element={
                        <>
                            <UserDashboardPage />
                        </>
                    } />
                    <Route exact path='/reports' element={
                        <>
                            <UserDashboardPage />
                        </>
                    } />
                    <Route path='/settings/changename' element={
                        <>
                            <ChangeNamePage />
                        </>
                    } />
                    <Route path='/settings/changeemail' element={
                        <>
                            <UserDashboardPage />
                        </>
                    } />
                    <Route path='/settings/changepassword' element={
                        <>
                            <ChangePasswordPage />
                        </>
                    } />
                    <Route path='/settings/changebiodata' element={
                        <>
                            <EditBiologicalData />
                        </>
                    } />
                    <Route path='/settings/addbiodata' element={
                        <>
                            <AddBiologicalData />
                        </>
                    } />
                    <Route path='/settings/deactivate' element={
                        <>
                            <DeactivateAccountPage />
                        </>
                    } />
                    <Route path='*' element={
                        <>
                            <h1>here</h1>
                        </>
                    } />
                </Routes>
            </div>
        </div>
    )
}

export default UserDashboard