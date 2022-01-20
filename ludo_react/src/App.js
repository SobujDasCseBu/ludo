import './assets/css/main.css';
import Firstpage from './components/Firstpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './screens/Login';
import Home from './screens/Home';
import Dice from './components/Dice';
import Pawn from './components/Pawn';
function App() {
  return (
    <div className='App'>
      
      <Router>
      <Firstpage />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/temp" element={<Pawn/>} />
        </Routes>
      </Router>
     
    </div>
  )
}

export default App
