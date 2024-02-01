
import React from 'react'
import "./AddProduct.css";
import Navbar from './Navbar';
// import Navbar from './Navbar'
import { useNavigate,useLocation } from 'react-router-dom';
import { useState,useEffect } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const AddProduct = ({sellerProducts,handleSellerProducts}) => {
    const location = useLocation()
    const [product,setProduct] = useState({
        title: '',
        description:'',
        price:'',
        discount:'',
        category:'',
        imgUrl:''
    })
    const navigate = useNavigate()
    const productData = location.state
    useEffect(()=>{
        if(productData.title){
            setProduct({
                title: productData.title,
                description:productData.description,
                price:productData.price,
                discount:productData.discount,
                category:productData.category,
                imgUrl:productData.imgUrl
            })
        }

    },[])

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
    
    const onFormSubmit = (e)=>{
        const formType = e.target.querySelector("#submitBtn").textContent
        const storedData = localStorage.getItem("userId");
        const yourObject = JSON.parse(storedData);
        const { user_type,user_id} = getUserDetails(yourObject)
        e.preventDefault()
        const productDataEscuela = {
            "title": product.title,
            "price": product.price,
            "description": product.description,
            "categoryId": 1,
            "images": [product.imgUrl]
        }
        // axios.post('https://api.escuelajs.co/api/v1/products/',productDataEscuela)
        // .then(res=>console.log(res.data))

        let sellerProductData = {}

        if(formType === "Update Product"){
            let updatedProductData = {}
            Object.keys(sellerProducts).map((item)=>{
                if(sellerProducts[item].title === productData.title){
                    updatedProductData[item] = product
                }else{
                    updatedProductData[item] = sellerProducts[item]
                }
            })
            sellerProductData = updatedProductData
        }
        else if(formType === "Add Product"){
            const id = uuidv4()
            sellerProductData = {[id]:product}
        }
        axios.post('http://localhost:5000/product/add',{[user_id]: {"items" : {...sellerProducts,...sellerProductData}}})
        .then((res)=>{console.log(res.data.message)})
        .catch((error)=>{
          console.log(error)
        })
        handleSellerProducts(sellerProductData,"addProduct")
        navigate("/home",{state:"seller"})
    }

    const onFieldChange = (e)=>{
        if(e.target.id === 'title'){
            setProduct({...product,title:e.target.value})
        }else if(e.target.id === 'description'){
            setProduct({...product,description:e.target.value})
        }
        else if(e.target.id === 'price'){
            setProduct({...product,price:e.target.value})
        }
        else if(e.target.id === 'discount'){
            setProduct({...product,discount:e.target.value})
        }
        else if(e.target.id === 'category'){
            setProduct({...product,category:e.target.value})
        }
        else if(e.target.id === 'image'){
            setProduct({...product,imgUrl:e.target.value})
        }
    }
  return (
    <div>
        <Navbar loginStatus={"seller"}/>
        <div className='seller-add-product-page'>
            <div className='product-form-con'>
                <form onSubmit={onFormSubmit}>
                    <input type='text' id='title' value={product.title} placeholder='Product Title' className='seller-page-input-field' onChange={onFieldChange}/>
                    <textarea id='description' placeholder='Product Description' value={product.description} className='seller-page-input-field' onChange={onFieldChange}></textarea>
                    <div style={{display:"flex",gap:"2rem"}}>
                        <input id='price' type='text' value={product.price} placeholder='Product Price' className='seller-page-input-field' onChange={onFieldChange}/>
                        <input id='discount' type='text' value={product.discount} placeholder='Product Discount' className='seller-page-input-field' onChange={onFieldChange}/>
                    </div>
                    <input id='category' type='text' value={product.category} placeholder='Product Category' className='seller-page-input-field' onChange={onFieldChange}/>
                    <input id='image' type='text' value={product.imgUrl} placeholder='Product Image Url' className='seller-page-input-field' onChange={onFieldChange}/>
                    <button id='submitBtn' type='submit' style={{marginLeft:"1rem",width:"fit-content",backgroundColor:productData.title && "#FCEA60"}} className='add-to-cart-btn' >{productData.title ? "Update Product" : "Add Product"}</button>
                </form>
            </div>
            <div className='product-view-con'>
                <h3 style={{fontSize:"24px"}}>LIVE PREVIEW</h3>
                <p>This is how, your customers will see your product on the website</p>
                <div className='seller-product'>
                    <img src={product.imgUrl} alt='product' className='seller-product-img'/>
                    <h4 style={{fontSize:"24px"}}>{product.title}</h4>
                    <div>
                        {product.price && <span style={{color:"#1564C1",fontSize:"20px",fontWeight:"700"}}>${product.price}</span>}
                        {product.discount && <span style={{color:"green",marginLeft:"1rem"}}>({product.discount}% OFF)</span>}
                    </div>
                    <button type='submit' style={{marginLeft:"1rem",marginTop:"1rem",width:"fit-content"}} className='add-to-cart-btn'>Add to cart</button>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default AddProduct