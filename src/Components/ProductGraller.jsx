
import React from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {IoIosArrowBack,IoIosArrowForward} from "react-icons/io"

import algoliasearch from 'algoliasearch';

import "./ProductGraller.css"
import Navbar from "./Navbar"

const ProductGaller = () => {
  const [products,setProducts] = useState([])
  const [filteredProducts,setFilteredProducts] = useState([])
  const [newProducts,setNewProducts] = useState([])
  const [page,setPage] = useState(1)
  const [lowerPrice,setLowerPrice] = useState(1)
  const [higherPrice,setHigherPrice] = useState(10000)

  const client = algoliasearch("HYPF5Y3FVR", "bdbab465b2cf95a7e05c413c146fe317");

  // const client = algoliasearch('6W6OOMGJ73', '5565379207b0d2b7cdb6434e1cf0b698');
  const index = client.initIndex('shop-project');

  const navigate = useNavigate()

  useEffect(()=>{
    if(filteredProducts.length > 0){
      setNewProducts(filteredProducts.slice(0,10))
    }
    
    
  },[filteredProducts])

  useEffect(()=>{
    const getProducts = async()=>{
        const response  = await axios.get('https://api.escuelajs.co/api/v1/products')
        index.saveObjects(response.data, { autoGenerateObjectIDIfNotExist: true })
        .then(({ objectIDs }) => {
          //console.log(objectIDs);
        })
        .catch(err => {
          console.log(err);
        });
        setProducts(response.data)
        setFilteredProducts(response.data)
        if(response.data.length >10){
          setNewProducts(response.data.slice(0,10))
        }else{
          setNewProducts(response.data)
        }
    }
    getProducts()
  },[])

  const getPagination=()=>{
    const n = Math.ceil(filteredProducts.length/10)
    
    const nums = []
    for(let i=1;i<=n;i++){
      nums.push(i)
    }
    return (
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap"}}>
        <IoIosArrowBack onClick={()=>{
          if(page!==1){
            setPage(page-1)
            setNewProducts(filteredProducts.slice(((page-1)*10)-10,((page-1)*10)))
          }
          
        }}/>
        {
          nums.map(eachItem=>
            <button key={eachItem} value={page} className='page-num-btn' style={{border:page===eachItem && "2px solid black"}} 
            onClick={(e)=>{
              const newPageNum = parseInt(e.target.textContent)
              setPage(newPageNum)
              setNewProducts(filteredProducts.slice((newPageNum*10)-10,(newPageNum*10)))
            }}
            >{eachItem}</button>
          )
        }
        <IoIosArrowForward onClick={()=>{
          if(page !== Math.ceil(filteredProducts.length/10)){
            setPage(page+1)
            setNewProducts(filteredProducts.slice(((page+1)*10)-10,((page+1)*10)))
          }
          
        }}/>
      </div>
    )
    
  }

  const updateFilteredData = (updatedData)=>{
    setFilteredProducts(updatedData)
    setNewProducts(updatedData.slice(0,10))
  }

  const onCategoryClick = (value)=>{
    let updatedData = []
    if(value === "All"){
      updatedData = products
    }else{
      updatedData = products.filter(eachItem=>eachItem.category.name === value)
    }
    
    updateFilteredData(updatedData)
  }

  return (
    <div>
      <Navbar/>
      <div className='products-page'>
          <div className='search-items-con'>
            <input type='text' placeholder='Search for items' className='search-item-field' onChange={(e)=>{
              index
              .search(e.target.value)
              .then(({ hits }) => {
                const updatedHits = []
                hits.forEach(hit=>{
                  const isIdPresent = updatedHits.some(item => item.id === hit.id);
                  if(!isIdPresent){
                    updatedHits.push(hit)
                  }
                })
                setProducts(updatedHits)
                setFilteredProducts(updatedHits)
              })
              .catch(err => {
                console.log(err);
              });
            }}/>
            <div style={{overflowY:"auto"}}>
              <div className='price-filter'>
                <span>Price Less than: </span>
                <input type='text'value={higherPrice} className='price-input-field'
                onChange={(e)=>{
                  setHigherPrice(e.target.value)
                  const updatedData = products.filter(eachItem=>(eachItem.price <= e.target.value) && (eachItem.price >= lowerPrice))
                  setFilteredProducts(updatedData)
                  if(updatedData.length >10){
                    setNewProducts(updatedData.slice(0,10))
                  }else{
                    setNewProducts(updatedData)
                  }
                }}
                />
              </div>
              <div className='price-filter'>
                <span>Price More than: </span>
                <input type='text' value={lowerPrice} className='price-input-field'
                onChange={(e)=>{
                  setLowerPrice(e.target.value)
                  const updatedData = products.filter(eachItem=>(eachItem.price >= e.target.value) && (eachItem.price <= higherPrice))
                  setFilteredProducts(updatedData)
                  if(updatedData.length >10){
                    setNewProducts(updatedData.slice(0,10))
                  }else{
                    setNewProducts(updatedData)
                  }
                }}
                />
              </div>
              <h4>Sort By:</h4>
              <select className='filter-dropdown' onChange={(e)=>{
                if(e.target.value==="Price Low to High"){
                  const updatedData = filteredProducts.sort((a,b)=>a.price - b.price)
                  updateFilteredData(updatedData)
                }
                else if(e.target.value==="Price High to Low"){
                  const updatedData = filteredProducts.sort((a,b)=>b.price - a.price)
                  updateFilteredData(updatedData)
                }
                else if(e.target.value==="A to Z"){
                  const updatedData = filteredProducts.sort((a,b)=>a.title.localeCompare(b.title))
                  updateFilteredData(updatedData)
                }
                else if(e.target.value==="Z to A"){
                  const updatedData = filteredProducts.sort((a,b)=>b.title.localeCompare(a.title))
                  updateFilteredData(updatedData)
                }

              }}>
                <option>Select Item</option>
                <option>Price Low to High</option>
                <option>Price High to Low</option>
                <option>A to Z</option>
                <option>Z to A</option>
              </select>
              <h4>Category</h4>
              <div className='category-filter-con'>
                <button style={{backgroundColor:"lemonchiffon"}} onClick={(e)=>onCategoryClick(e.target.textContent)}>Furniture</button>
                <button style={{backgroundColor:"lightblue"}} onClick={(e)=>onCategoryClick(e.target.textContent)}>Bags</button>
                <button style={{backgroundColor:"lightgreen"}} onClick={(e)=>onCategoryClick(e.target.textContent)}>Electronics</button>
                <button style={{backgroundColor:"turquoise"}} onClick={(e)=>onCategoryClick(e.target.textContent)}>Clothes</button>
                <button style={{backgroundColor:"lightcoral"}} onClick={(e)=>onCategoryClick(e.target.textContent)}>Grocery</button>
                <button style={{backgroundColor:"mediumpurple"}} onClick={(e)=>onCategoryClick(e.target.textContent)}>Shoes</button>
                <button style={{backgroundColor:"lightpink"}} onClick={(e)=>onCategoryClick(e.target.textContent)}>Office Supplies</button>
                <button style={{backgroundColor:"#FCEA60"}} onClick={(e)=>onCategoryClick(e.target.textContent)}>All</button>
              </div>
            </div>
            <button className='navbar-btn' style={{backgroundColor:"#5471FD",marginTop:"2rem",padding:"0.5rem 2rem",color:"white",width:"100%"}} onClick={()=>navigate("/cart")}>Go to Cart</button>
          </div>
          <div className='products-gallery-wrapper'>
            <h3 style={{fontSize:"20px"}}>SELECT A PRODUCT AND ADD TO CART</h3>
            <ul className='products-list'>
                {newProducts.length !==0 ? newProducts.map(product=>{
                    return (<li key={product.id} className='product-item'onClick={()=>navigate(`/products/${product.id}`,{state:product})}>
                        <img src={product.images[0]} alt={product.title} className='product-img'/>
                        <p className='product-title'>{product.title}</p>
                        <div style={{display:"flex",alignItems:"center",gap:"1rem"}}>
                          <p className='product-price'>$ {product.price}</p>
                          <button className='view-item-btn' >View Item</button>
                        </div>
                        
                    </li>)
                }) : <p style={{marginTop:"20%"}}>No Products Found</p>}
            </ul>
            {
              filteredProducts && getPagination()
            }
          </div>
      </div>
    </div>
  )
}

export default ProductGaller