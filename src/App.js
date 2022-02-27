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

function App() {
  const [theme, setTheme] = useState('light');
  const themeToggler = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light')
  }
  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
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
                </>
              } />
              <Route exact path='/about' element={
                <>
                  <Header theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
                  <About />
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
