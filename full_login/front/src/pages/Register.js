import axios from 'axios';
import React, { useState } from 'react';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const navigate=useNavigate()
    const [data,setData]=useState({
        name:'',
        email:'',
        password:''
    })

    const registerUser=async (e)=>{
        e.preventDefault();
        const {name,email,password}=data
        try {
            const{data}= await axios.post('/register',{
                name,email,password
            })
            if(data.error){
                toast.error(data.error)
            }else{
                setData({})
                toast.success("Login success !")
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <form onSubmit={registerUser}>
            <input type="text" placeholder='Enter your Name...' value={data.name} onChange={(e)=>setData({...data,name:e.target.value})}/>
            <input type="email" placeholder='Enter your Email...'  value={data.email} onChange={(e)=>setData({...data,email:e.target.value})} />
            <input type="password" placeholder='Enter your Password...'  value={data.password} onChange={(e)=>setData({...data,password:e.target.value})} />
            <button type='submit'>Submit</button>
        </form>
    </div>
  )
}