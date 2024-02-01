

import React from 'react'
import "./Authin.css"
import { useLocation } from 'react-router-dom'
import shopper from "../assets/shopper.png"
import seller from "../assets/seller.png"
import { useState } from 'react'
import axios from "axios"
import {BsArrowRight} from "react-icons/bs"
import { useNavigate } from 'react-router-dom'
 import Home from './Home' 

const  Authin  = ({handleSuccessLogin}) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [isLogin,setIsLogin] = useState(true)
  const [loginStatus,setLoginStatus] = useState(location.state.loginStatus)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [username,setUsername] = useState('')
  const [confirmPassword,setConfirmPassword] = useState('')
  const [error,setError] = useState('')
  const authImg = loginStatus === 'shopper' ? shopper : seller
  const buttonText = loginStatus === 'shopper' ? 'seller':'shopper'
  const buttonClass = loginStatus === 'shopper' ? ' shopper-btn':' seller-btn'
  const fromButton = isLogin ? `${loginStatus === 'shopper' ? 'Shoppers':'Sellers'} Login` : 'Create Account'

  const onGuestLogin = ()=>{
    const data = {
        email: "cust@gmail.com",
        password: "9090",
    }
    axios.post('http://localhost:5000/shopper/signin',data)
    .then((res)=>{
        localStorage.setItem("token",res.data.token)
        const id = res.data.userId
        if(loginStatus === "shopper"){
            localStorage.setItem("userId",JSON.stringify({user:"shopper",id}))
        }else{
            localStorage.setItem("userId",JSON.stringify({user:"seller",id}))
        }
        if(res.data.message){
            handleSuccessLogin()
            navigate('/Home',{state:loginStatus}) //state use  to navigate from home page
        }
        else{
            setError(res.data.error)
        }
    })
    .catch((error)=>{
        console.log(error)
    })
  }

  const onFormSubmit = (e)=>{
    e.preventDefault()
    if(!isLogin){
        if(password === confirmPassword){
            if(loginStatus === 'shopper'){
                const shopperData = {
                    email,
                    username,
                    password
                }
                axios.post('http://localhost:5000/shopper/signup',shopperData)
                .then((res)=>{
                    setEmail('')
                    setUsername('')
                    setPassword('')
                    setConfirmPassword('')
                    setIsLogin(true)
                })
            }
            else{
                const sellerData = {
                    email,
                    username,
                    password
                }
                axios.post('http://localhost:5000/seller/signup',sellerData)
                .then((res)=>{
                    setEmail('')
                    setUsername('')
                    setPassword('')
                    setConfirmPassword('')
                    setIsLogin(true)
                })
            }
            setError('')
        }else{
            setError('Password not matched ! please try again')
        }
        
    }
    else{
        if(loginStatus === 'shopper'){
            const shopperData = {
                email,
                password
            }
            axios.post('http://localhost:5000/shopper/signin',shopperData)
            .then((res)=>{
                localStorage.setItem("token",res.data.token)
                const id = res.data.userId
                localStorage.setItem("userId",JSON.stringify({user:"shopper",id}))
                if(res.data.message){
                    handleSuccessLogin()
                    navigate('/Home',{state:loginStatus})
                }
                else{
                    setError(res.data.error)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        }
        else{
            const sellerData = {
                email,
                password
            }
            axios.post('http://localhost:5000/seller/signin',sellerData)
            .then((res)=>{
                localStorage.setItem("token",res.data.token)
                const id = res.data.userId
                localStorage.setItem("userId",JSON.stringify({user:"seller",id}))
                if(res.data.message){
                    handleSuccessLogin()
                    navigate('/Home',{state:loginStatus})
                }
                else{
                    setError(res.data.error)
                }
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    }
    
  }

  return (
    <div className='page-login' style={{backgroundColor:loginStatus === 'shopper' ? '#E2F2FF':'#1564C1'}}>
        <div className='one-section'>
            <img src={authImg} alt='auth'/>
            <button className={buttonClass} onClick={()=>setLoginStatus(loginStatus === 'shopper' ? 'seller':'shopper')}>Go to {buttonText} login</button>
        </div>
        <div className='two-section'>
            <button style={{color:loginStatus === 'shopper' ? '#1564C1':'#E2F2FF'}} className='cust-login-section-btn' onClick={onGuestLogin}>GUEST LOGIN <BsArrowRight style={{fontSize:"24px"}}/></button>
            <div className='form-container' style={{backgroundColor:loginStatus === 'shopper' ? '#1564C1':'#E2F2FF'}}>
                <p style={{color:loginStatus === 'shopper' ? '#E2F2FF':'#1564C1'}}>Login and start shopping from your favorite brands. Refer a friend and save 50% 0FF</p>
                <form onSubmit={onFormSubmit}>
                    <input type='email' placeholder='Login Email' className='input-field' value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                    {
                        !isLogin &&
                        <input type='text' placeholder='Username' className='input-field' value={username} onChange={(e)=>setUsername(e.target.value)} required/>
                        
                    }
                    <input type='password' placeholder='Password' className='input-field' value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                    {
                        !isLogin && 
                        <input type='password' placeholder='Re-Enter Password' className='input-field' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} required/>
                    }
                    <button type='submit' className='login-btn'>{fromButton}</button>
                    {error && <p style={{color:'red',lineHeight:0,margin:0}}>{error}</p>}
                    <span style={{color:loginStatus === 'shopper' ? '#E2F2FF':'#1564C1'}} onClick={()=>setIsLogin(!isLogin)}>{isLogin ? 'Create Account' : 'Login'}</span>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Authin