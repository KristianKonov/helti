import React, {useContext} from 'react'
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
import history from './../history'
import UserContext from '../../context'
import UserDashboard from '../../pages/userDashboard'
import FaqPage from '../../pages/faq'

const PageRoutes = ({theme, setTheme, themeToggler, flag}) => {
    const userData = useContext(UserContext)
    return (
        <BrowserRouter history={history}>
            <Routes>
                <Route exact path='/' element={
                <>
                    <div className="page-wrapper">
                        <LandingPage>
                        <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} />
                        <Homepage />
                        </LandingPage>
                        {!userData.isAuthenticated && <LandingInfo />}
                        <SearchOurDatabase />
                    </div>
                    <Footer />
                </>
                } />
                <Route exact path='/about' element={
                <>
                    <div className="page-wrapper">
                        <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                        <About />
                    </div>
                    <Footer />
                </>
                } />
                <Route exact path='/faq' element={
                <>
                    <div className="page-wrapper">
                        <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                        <FaqPage />
                    </div>
                    <Footer />
                </>
                } />
                <Route exact path='/dashboard/*' element={
                <>
                    <div className="page-wrapper">
                        <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                        <UserDashboard />
                    </div>
                    <Footer />
                </>
                } />
                <Route path='/login' element={
                <>
                    <div className="page-wrapper">
                        <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                        <LoginPage />
                    </div>
                    <Footer />
                </>
                } />
                <Route path='/register' element={
                <>
                    <div className="page-wrapper">
                        <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                        <RegisterPage />
                    </div>
                    <Footer />
                </>
                } />
                <Route exact path='/admin/*' element={
                <>
                    <div className="page-wrapper">
                        <Dashboard />
                    </div>
                    <Footer />
                </>
                } />
                <Route path='*' element={
                <>
                    <div className="page-wrapper">
                        <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                        <NotFound />
                    </div>
                    <Footer />
                </>
                } />
            </Routes>
        </BrowserRouter>
    )
}

export default PageRoutes