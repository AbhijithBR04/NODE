import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
