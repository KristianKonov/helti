import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.sass';
import './styles/variables.sass'
import Header from './components/header'
import Homepage from './pages/homepage';
import About from './pages/about';
import LandingPage from './components/landing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={
            <>
              <LandingPage>
                <Header />
                <Homepage />
              </LandingPage>
            </>
          } />
          <Route exact path='/about' element={
            <>
              <Header flag={true} />
              <About />
            </>
          } />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
