import './App.css';
import './styles/variables.sass'
import Header from './components/header'
import LandingPage from './components/landing'

function App() {
  return (
    <div className="App">
    <LandingPage>  
      <Header />
    </LandingPage>
    </div>
  );
}

export default App;
