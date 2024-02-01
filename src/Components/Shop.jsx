import React from 'react'
import "./shop.css"
import shopper from "../assets/shopper.png"
import seller from "../assets/seller.png"
import { useNavigate } from 'react-router-dom'

const Shop = () => {
  const navigate  = useNavigate()

  return (
    <div className='shop-page'>
        <div className='shop-section'>
            <img src={shopper} alt='shopper'/>
            <button className=' shopper-btn' onClick={()=>navigate("/authin",{state:{loginStatus:"shopper"}})}>Shoppers Login</button>
        </div>
        <div className='shop seller-section'>
            <img src={seller} alt='shopper'/>
            <button className=' seller-btn' onClick={()=>navigate("/authin",{state:{loginStatus:"seller"}})}>Sellers Login</button>
        </div>
    </div>
  )
}

export default Shop