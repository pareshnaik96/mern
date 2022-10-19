import './App.css';
import './Component/Style.css'
import Home from './Component/Home'
import Login from './Component/Login'
import Register from './Component/Register'
import {BrowserRouter as Router, Routes,Route} from "react-router-dom"
import data from './ContextApi'
import { useState } from 'react';


function App() {
  const [userdata,setUserData] = useState({})
  console.log(userdata)
  return (
    <div className="App">
      <data.Provider value={{userdata,setUserData}}>
      <Router>
      <Routes>
        <Route exact path = "/" element={userdata && userdata._id ? <Home/>: <Login/>}/>
        <Route  path = "/login" element={<Login/>}/>
        <Route  path = "/register" element={<Register/>}/>
      </Routes>
    </Router>
      </data.Provider>
    </div>
  );
}

export default App;
