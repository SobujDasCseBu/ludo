import './assets/css/main.css';
import Firstpage from './components/Firstpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './screens/Login';
import Home from './screens/Home';
import Dice from './components/Dice';
import Pawn from './components/Pawn';
import Main from './screens/Main';
import Timer from './screens/Timer';
function App() {
  return (
    <div className='App'>
      
      <Router>
      <Firstpage />
      <Timer />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/login" element={<SignIn/>} />
          <Route path="/temp" element={<Pawn/>} />
          <Route path="/main" element={<Main/>} />
        </Routes>
      </Router>
     
    </div>
  )
}

export default App
