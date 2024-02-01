
import React from 'react'

import "./Purchase.css"
import Navbar from   "./Navbar"
const Purchase = ({purchases}) => {
  let totalPrice = 0
  console.log(purchases)
  return (
    <div>
        <Navbar/>
        <div className='purchase-page'>
            <h3 style={{fontSize:"24px",fontWeight:"bold"}}>YOUR PURCHASES</h3>
            <div className='purchases-con'>
            {
                Object.keys(purchases).map(cartId=>{
                    const {title,image,quantity,price} = purchases[cartId]
                    totalPrice+= price
                    return(
                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center"}}>
                            <img src={image} alt={title} className='purchase-product-img'/>
                            <p className='purchases-price'>${price}</p>
                        </div>
                    )
                })
            }
            </div>
            <p className='purchase-total-price'>Total Price: <span>${totalPrice}</span></p>
        </div>
    </div>
  )
}

export default Purchase