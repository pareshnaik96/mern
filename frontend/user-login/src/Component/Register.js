import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [user,setUser]=useState({
        firstname:"",
        lastname:"",
        email:"",
        password:"",
        repassword:"",
    })

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
//    console.log(user)
  
  const handleSubmit = async(e)=>{
    e.preventDefault();
    console.log(user)
    const { firstname,lastname,email,password,repassword}= user
    if(firstname && lastname && email && password ){
        if(password === repassword){
          await axios.post("http://localhost:4000/register",user)
          .then((res)=> {alert(res.data.message)
            navigate("/login")
          })

        }else{
          alert("Password not matched")
        }
     }else{
         alert("Enter the required fields")
   }
  }
  return (
    <div className='container'>
        <form>
        <label htmlFor='firstname'>First Name</label>
        <input type='text' id='firstname' name='firstname' value={user.firstname} onChange={handleChange}/>

        <label htmlFor='lastname'>Last Name</label>
        <input type='text' id='lastname' name='lastname' value={user.lastname} onChange={handleChange}/>

        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' value={user.email} onChange={handleChange}/>

        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' value={user.password} onChange={handleChange}/>

        <label htmlFor='re-password'>Re-Password</label>
        <input type='password' id='re-password' name='repassword' value={user.repassword} onChange={handleChange}/>

        <button className='btn' onClick={handleSubmit}>Register</button>

        <button className='btn' onClick={()=> navigate("/login")}>Login</button>
     </form>
    </div>
  )
}

export default Register
