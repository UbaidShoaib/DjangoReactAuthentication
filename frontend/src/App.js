import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {Home} from "./components/home";
import Navigation from './components/navigation/navigation';
import {Logout} from './components/authentication/logout';
import React from 'react'
import RegisterForm from "./components/authentication/register";
import Login from "./components/authentication/login";
import UserDetail from "./components/user/userDetail";
function App() {
    return(
      <BrowserRouter>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/register" element={<RegisterForm/>}/>
          <Route path="/users/:userId" element={<UserDetail />} />
        </Routes>
      </BrowserRouter>)
}
export default App;