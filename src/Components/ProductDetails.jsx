
import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import "./ProductDetails.css";
import axios from 'axios'
import Navbar from './Navbar'


const ProductDetails = ({handleCartItems,cartItems}) => {
  const location = useLocation()
  const product = location.state
  const{images,title,price,category,id} = product
  const [similarProducts,setSimilarProducts] = useState([])

  const navigate = useNavigate()

  useEffect(()=>{
    const getProducts = async()=>{
        const response  = await axios.get(`https://api.escuelajs.co/api/v1/categories/${category.id || 1}/products?offset=0&limit=20`)
        setSimilarProducts(response.data)
    }
    getProducts()
  },[])
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Navbar/>
      <div className='product-details-page'>
          {showModal && (
          <div className="modal-a">
            <div className="modal-content-a">
              <img src={images[0]} alt='cart-img' className='cart-alert-img'/>
              <p>This item added into Cart</p>
            </div>
          </div>
        )}
          <div className='product-sub-img-con'>
              {images.map((image,index)=><img key={index} src={image} alt='product-sub' className='product-sub-img'/>)}
          </div>
          <div className='product-details-con'>
              <img src={images[0]} alt={title} className='product-details-img'/>
              <h4>{title}</h4>
              <p className='product-price' style={{color:"rgb(33,106,217)"}}>$ {price} <span style={{color:"green",fontSize:"12px"}}>(10% OFF)</span></p>
              <button className='add-to-cart-btn' onClick={()=>{
                  if(id in cartItems){
                      handleCartItems({[id]:{title,price,image:images[0],quantity:cartItems[id].quantity + 1}},id,"add")
                  }else{
                      handleCartItems({[id]:{title,price,image:images[0],quantity:1}},id,"add")
                  }
                  setShowModal(true)

                  setTimeout(()=> setShowModal(false), 1000);
              }}>Add to Cart</button>
          </div>
          <div className='similar-category-products'>
              <h3>Products under this category</h3>
              <ul className='products-list' style={{overflowY:"auto"}}>
              {similarProducts && similarProducts.map(product=>{
                  return (<li key={product.id}
                  className='product-item'
                  onClick={()=>navigate(`/products/${product.id}`,{state:product})}
                  style={{width:"148px",height:"240px",padding:"0.6rem",borderRadius:"16px",margin:"0.8rem"}}
                  >
                      <img 
                      src={product.images[0]}
                      alt={product.title} 
                      className='product-img'
                      style={{height:"120px",marginBottom:"1rem",borderRadius:"16px"}}
                      />
                      <p className='product-title' style={{fontSize:"12px"}}>{product.title}</p>
                      <p className='product-price' style={{fontSize:"12px"}}>$ {product.price}</p>
                      <button className='view-item-btn' style={{padding:"0.3rem 1rem",fontSize:"12px"}} >View Item</button>
                  </li>)
              })}
          </ul>
          </div>
      </div>
    </div>
  )
}

export default ProductDetails