import React , { useState } from 'react'
import './App.sass';
import './styles/variables.sass'
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./components/globalStyles";
import { lightTheme, darkTheme } from "./components/theme"
import PageRoutes from './components/routes';
import {UserProvider} from './context';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  const [theme, setTheme] = useState('');
  if(!localStorage.getItem('theme'))
    localStorage.setItem('theme', 'light')

  const themeToggler = () => {
    if (localStorage.getItem('theme') === 'light'){
      localStorage.setItem('theme', 'dark')
      setTheme('dark')
    } else {
      localStorage.setItem('theme', 'light')
      setTheme('light')
    }

  }
  return (
    <ThemeProvider theme={localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme}>
      <>
        <HelmetProvider>
          <UserProvider>
              <GlobalStyles/>
              <div className="App">
                <PageRoutes theme={theme} setTheme={setTheme} themeToggler={themeToggler} flag={true} />
              </div>
          </UserProvider>
        </HelmetProvider>
      </>
    </ThemeProvider>
  );
}

export default App;
