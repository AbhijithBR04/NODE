import React from 'react';
import { useLocation,useNavigate } from 'react-router-dom';

function Home(){
    const location=useLocation()
  return (
    <div>
        <h1>Hi {location.state.id} welcome to home page</h1>
    </div>
  )
}

export default Home