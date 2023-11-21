import './App.css';
import { Routes,Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'

axios.defaults.baseURL='http://localhost:8000';
axios.defaults.withCredentials=true;

function App() {
  return (
    <div className="App">
      <Navbar />
      <Toaster position='bottom' toastOptions={{duration:2000}}/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/login' element={<Login/>} />
        </Routes>
    </div>
  );
}

export default App;
