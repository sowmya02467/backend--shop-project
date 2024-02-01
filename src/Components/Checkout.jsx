
import React from 'react'
import checkout from "../assets/checkout.png"
import "./checkout.css"
import { useNavigate } from 'react-router-dom'
 import Navbar from './Navbar'
 
const Checkout = () => {
  const navigate = useNavigate()
  return (
    <div>
      <Navbar/>
      <div className='checkout-page'>
          <img src={checkout} alt="checkout" className='checkout-img'/>
          <button className='add-to-cart-btn' onClick={()=>navigate("/purchase")}>Go to Purchases</button>
      </div>
    </div>
  )
}

export default Checkout