import React, { useContext } from 'react'
import data from '../ContextApi'

const Home = () => {

  const {userdata,setUserData} = useContext(data)
  console.log(userdata.firstname)

const logout = ()=>{
  setUserData({})
}


  return (
    <div className='container container-home'>
      <h1>Home Page</h1>
      <h2 className='username-home'>Hiii 👋 {userdata.firstname} {userdata.lastname}</h2>
      <button className='btn' onClick={logout}>Logout</button>
    </div>
  )
}

export default Home
