import './App.css';
import Firstpage from './components/Firstpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './screens/Login';
import Home from './screens/Home';
function App() {
  return (
    <div className='App'>
      
      <Router>
      <Firstpage />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/login" element={<SignIn/>} />
        </Routes>
      </Router>
     
    </div>
  )
}

export default App
