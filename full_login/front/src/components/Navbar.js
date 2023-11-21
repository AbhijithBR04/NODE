import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {


  const myComponentStyle = {
    color: 'blue',
    lineHeight: 5.0,
    padding: '1.5em',
    display:'flex',
    flexWrap:'wrap',
    gap:'1px',
    justifyContent:'space-around',
    
    
 }
  return (
    <div  >
            <nav style={myComponentStyle}>
                <Link to='/'>Home</Link>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
            </nav>
    </div>
  )
}
