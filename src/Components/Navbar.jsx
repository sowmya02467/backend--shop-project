
import React from 'react'
import "./Navbar.css"
import logo from "../assets/logo.png"
import {BsCartFill} from "react-icons/bs"
import {FaUser} from "react-icons/fa"
import { useNavigate } from 'react-router-dom'

const Navbar = ({loginStatus}) => {

  
  const navigate = useNavigate()
  return (
    <div className='shop-navbar'>
        <div className='navbar-left-section' onClick={()=>navigate("/home",{state:loginStatus})}>
            <img src={logo} alt='logo' className='logo-img'/>
            <h1 style={{fontSize:"32px",marginTop:"4px"}}>STAR {loginStatus !== "seller" ? "SHOPPER" : "SELLER"}</h1>
        </div>
        <div className='navbar-right-section'>
            {loginStatus !== "seller" && <BsCartFill className='navbar-icon' onClick={()=>navigate("/cart")}/>}
            <FaUser className='navbar-icon' onClick={()=>{
              if(loginStatus === "shopper" || loginStatus === undefined){
                navigate("/purchase")
              }if(loginStatus === "seller"){
                navigate("/home",{state:loginStatus})
              }
            }}/>
            <button className='navbar-btn' onClick={()=>{
                localStorage.removeItem('token')
                localStorage.removeItem('userId')
                navigate("/auth",{state:{loginStatus:"shopper"}})
            }}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar