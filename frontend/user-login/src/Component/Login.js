import axios from 'axios'
import React, { useContext, useState } from 'react'
import data from '../ContextApi'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [user,setUser]=useState({
        email:"",
        password:""
    })

const {setUserData}= useContext(data)

const navigate = useNavigate();

    const handleChange = (e)=>{
        const {name,value} = e.target
        setUser((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleSubmit = async(e)=>{
        e.preventDefault();    //for not refreshing the page
       axios.post("http://localhost:4000/login",user)
       .then(res=> {
        alert(res.data.message)
        setUserData(res.data.user)
        navigate("/")
    })
  }

  return (
    <div className='container'>
     <form>
        <label htmlFor='email'>Email Id</label>
        <input type='email' id='email' name='email' value={user.email} onChange={handleChange}/>

        <label htmlFor='password'>password</label>
        <input type='password' id='password' name='password' value={user.password} onChange={handleChange}/>
         
         <div className='btn-container'>
         <button className='btn' onClick={handleSubmit}>Login</button>
         <button className='btn' onClick={()=> navigate("/register")}>Register</button>
         </div>
    
     </form>
    </div>
  )
}

export default Login
