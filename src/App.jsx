import './App.css';
import { Routes,Route } from 'react-router-dom';
import Shop from './Components/Shop';
import Authin from './Components/Authin';
 import Home from './Components/Home';
import ProductGraller from './components/ProductGraller';
 import ProductDetails from "./components/ProductDetails"
 import Cart from "./components/Cart"
import { useState,useEffect } from 'react';
import axios from 'axios';
import Checkout from "./components/Checkout"
import Purchase from './components/Purchase';
import AddProduct from './components/AddProduct';


function App() {
  const [cartItems,setCartItems] = useState({})
  const [purchases,setPurchases] = useState({})
  const [sellerProducts,setSellerProducts] = useState({})

  const [successLogin,setSuccessLogin] = useState(false)

  const getUserDetails = (yourObject)=>{
    let user_type =''
    let user_id = ''
    if (yourObject.hasOwnProperty("user")) {
      user_type = yourObject.user
    }
    
    if (yourObject.hasOwnProperty("id")) {
      user_id = yourObject.id
    }  
    return { user_type,user_id}
  }
  const handleCartItems = (item,id,action)=>{
    if(action === "add"){
      const storedData = localStorage.getItem("userId");
      const yourObject = JSON.parse(storedData);
      const { user_type,user_id} = getUserDetails(yourObject)
      const userCart = {[user_id] :{"items" : {...cartItems,...item}} }    
      axios.post('http://localhost:5000/cart/add',userCart)
        .then((res)=>{/*console.log(Res.data.message)*/})
        .catch((error)=>{
          console.log(error)
      })
      setCartItems({...cartItems,...item})
    }else if(action === "delete"){
      const storedData = localStorage.getItem("userId");
      const yourObject = JSON.parse(storedData);
      const { user_type,user_id} = getUserDetails(yourObject)
      delete cartItems[id]
      const userCart = {[user_id] :{"items" : cartItems} }    
      axios.post('http://localhost:5000/cart/add',userCart)
        .then((res)=>{/*console.log(Res.data.message)*/})
        .catch((error)=>{
          console.log(error)
      })
      setCartItems({...cartItems})
    }else if(action === "cartDelete"){
      setPurchases({...purchases,...item})
      axios.post('http://localhost:5000/purchase/add',{[id] :{"items" : {...purchases,...item}} })
        .then((res)=>{/*console.log(Res.data.message)*/})
        .catch((error)=>{
          console.log(error)
      })
      setCartItems({})
    }
  }

  const handleSellerProducts = (data,action)=>{
    if(action === 'deleteProduct'){
      setSellerProducts({...data})
    }else if(action === "addProduct"){
      setSellerProducts({...sellerProducts,...data})
    }
    
  }

  const handleSuccessLogin = ()=>{
    setSuccessLogin(!successLogin)
  }

  useEffect(()=>{
    const storedData = localStorage.getItem("userId");
    if(storedData){
      const yourObject = JSON.parse(storedData);
      const { user_type,user_id} = getUserDetails(yourObject)

      if(user_type === "shopper"){

        axios.get(`http://localhost:5000/cart/${user_id}`)
        .then(res=>{
          if(res.data.items){
            Object.keys(res.data.items).map(item=>Object.keys(res.data.items[item]).map(a=>{
              if(a === "items"){
                setCartItems(res.data.items[item][a])
              }
            }))
          }else{
            setCartItems({})
          }
        })

        axios.get(`http://localhost:5000/purchase/${user_id}`)
        .then(res=>{
          if(res.data.items){
            Object.keys(res.data.items).map(item=>Object.keys(res.data.items[item]).map(a=>{
              if(a === "items"){
                setPurchases(res.data.items[item][a])
              }
            }))
          }else{
            setPurchases({})
          }
        })

      }
      

      if(user_type === "seller"){
        axios.get(`http://localhost:5000/product/${user_id}`)
        .then(res=>{
          if(res.data.items){
            Object.keys(res.data.items).map(item=>Object.keys(res.data.items[item]).map(a=>{
              if(a === "items"){
                setSellerProducts(res.data.items[item][a])
              }
            }))
          }else{
            setSellerProducts({})
          }
        })
      }


    }
    
  },[successLogin])
  
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Shop/>}></Route>
        <Route path='/Authin' element={<Authin handleSuccessLogin={handleSuccessLogin}/>}></Route>
         <Route path='/Home' element={<Home sellerProducts={sellerProducts} handleSellerProducts={handleSellerProducts}/>}></Route>
         <Route path='/products' element={<ProductGraller/>}></Route>
        <Route path='/products/:id' element={<ProductDetails handleCartItems={handleCartItems} cartItems={cartItems}/>}></Route>
        <Route path='/cart' element={<Cart cartItems={cartItems} handleCartItems={handleCartItems}/>}></Route>
        <Route path='/checkout' element={<Checkout/>}></Route>
        <Route path='/purchase' element={<Purchase purchases={purchases}/>}></Route>
        <Route path='/addproduct' element={<AddProduct sellerProducts={sellerProducts} handleSellerProducts={handleSellerProducts}/>}></Route> 
      </Routes> 
    </div>
  );
}

export default App;