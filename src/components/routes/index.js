import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from '../landing'
import Homepage from '../../pages/homepage'
import Header from '../header'
import Footer from '../footer'
import About from '../../pages/about'
import LandingInfo from '../landing_info'
import NotFound from '../../pages/not-found'
import RegisterPage from '../../pages/register'
import LoginPage from '../../pages/login'
import SearchOurDatabase from '../SearchDB'
import Dashboard from '../../pages/dashboard/Dashboard'
import OrdersPage from '../../pages/dashboard/OrdersPage'
import history from './../history'

const PageRoutes = ({theme, setTheme, themeToggler, flag}) => {
    return (
        <BrowserRouter history={history}>
            <Routes>
                <Route exact path='/' element={
                <>
                    <LandingPage>
                    <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} />
                    <Homepage />
                    </LandingPage>
                    <LandingInfo />
                    <SearchOurDatabase />
                    <Footer />
                </>
                } />
                <Route exact path='/about' element={
                <>
                    <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                    <About />
                    <Footer />
                </>
                } />
                <Route path='/login' element={
                <>
                    <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                    <LoginPage />
                    <Footer />
                </>
                } />
                <Route path='/register' element={
                <>
                    <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                    <RegisterPage />
                    <Footer />
                </>
                } />
                <Route path='/admin' element={
                <>
                    <Dashboard />
                    <Footer />
                </>
                } />
                <Route path='*' element={
                <>
                    <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                    <NotFound />
                    <Footer />
                </>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes