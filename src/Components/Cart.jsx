
import React from 'react'
import { Table } from 'react-bootstrap'
import cartPage from "../assets/cartPage.png"
import Navbar from './Navbar'
import {MdDelete} from "react-icons/md"
 
import "./Cart.css"
import { useNavigate } from 'react-router-dom'
import { useState,useEffect } from 'react'
import axios from 'axios'

const Cart = ({cartItems,handleCartItems}) => {
   const navigate = useNavigate()
   let totalQuantity = 0
   let totalPrice = 0
   
  return (
    <div>
        <Navbar/>
        <div className='cart-page'>
            <div className='cart-details-section'>
                <h3>YOUR CART : </h3>
                <Table className='cart-table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.keys(cartItems).map(cartId=>{
                                const {title,quantity,price} = cartItems[cartId]
                                totalQuantity +=quantity
                                totalPrice+= (quantity*price)
                                return(
                                    <tr key={cartId}>
                                        <td>{title}</td>
                                        <td>{quantity}</td>
                                        <td>$ {quantity*price}</td>
                                        <td><MdDelete className='delete-icon' onClick={()=>{
                                            handleCartItems(cartItems[cartId],cartId,'delete')
                                        }}/></td>
                                    </tr>
                                )
                            })
                        }
                        <tr>
                            <td>Total</td>
                            <td>{totalQuantity}</td>
                            <td>$ {totalPrice}</td>
                        </tr>
                    </tbody>
                </Table>
                <button className='add-to-cart-btn' onClick={()=>{
                    let user_id = ''
                    const storedData = localStorage.getItem("userId");
                    const yourObject = JSON.parse(storedData);
                    if (yourObject.hasOwnProperty("id")) {
                        user_id = yourObject.id
                    }
                    axios.delete(`http://localhost:5000/cart/delete/${user_id}`)
                    handleCartItems(cartItems,user_id,"cartDelete")
                    navigate("/checkout")
                }}>Purchase</button>
                <button style={{marginLeft:"1rem"}} className='add-to-cart-btn' onClick={()=>navigate("/products")}>Back to shop</button>
            </div>
            <div className='cart-img-section'>
                <img src={cartPage} alt='cart' className='cart-page-img'/>
            </div>
        </div>
    </div>
  )
}

export default Cart