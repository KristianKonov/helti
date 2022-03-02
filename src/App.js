import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React , { useState } from 'react'
import './App.sass';
import './styles/variables.sass'
import Header from './components/header'
import Homepage from './pages/homepage';
import About from './pages/about';
import LandingPage from './components/landing';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/theme"
import NotFound from './pages/not-found'
import LandingInfo from './components/landing_info';
import LoginPage from './pages/login';
import SearchOurDatabase from './components/SearchDB';

function App() {
  const [theme, setTheme] = useState('');
  if(!localStorage.getItem('theme'))
    localStorage.setItem('theme', 'light')
  
  console.log('start: LS - ', localStorage.getItem('theme'), ' theme - ', theme)

  const themeToggler = () => {
    console.log('before: LS - ', localStorage.getItem('theme'), ' theme - ', theme)
    if (localStorage.getItem('theme') === 'light'){
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }

    
    // {theme === 'light' ? setTheme('dark') : setTheme('light')}
    // localStorage.setItem('theme', theme)
    console.log('after: LS - ', localStorage.getItem('theme'), ' theme - ', theme)
  }
  return (
    <ThemeProvider theme={localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme}>
      <>
        <GlobalStyles/>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route exact path='/' element={
                <>
                  <LandingPage>
                    <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} />
                    <Homepage />
                  </LandingPage>
                  <LandingInfo />
                  <SearchOurDatabase />
                </>
              } />
              <Route exact path='/about' element={
                <>
                  <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                  <About />
                </>
              } />
              <Route path='/login' element={
                <>
                  <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                  <LoginPage />
                </>
              } />
              <Route path='*' element={
                <>
                  <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                  <NotFound />
                </>
              } />
            </Routes>
        </BrowserRouter>
        </div>
      </>
    </ThemeProvider>
  );
}

export default App;
