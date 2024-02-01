

import React from 'react'
import "./Home.css"

import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import carouselOneImg from "../assets/carousel-1.png"
import carouselTwoImg from "../assets/carousel-2.png"
import carouselThreeImg from "../assets/carousel-3.png"
import productCom1 from "../assets/product-1.png"
import productCom2 from "../assets/product-2.png"
import productCom3 from "../assets/product-3.png"
import productCom4 from "../assets/product-4.png"
import productCom5 from "../assets/product-5.png"
import productCom6 from "../assets/product-6.png"

import { useNavigate,useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {datatype} from 'faker'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const options = {
responsive: true,
plugins: {
    legend: {
    position: 'top',
    },
    title: {
    display: true,
    text: 'Chart.js Bar Chart',
    },
},
};
const labels = ['Item1', 'Item2', 'Item3', 'Item4', 'Item5'];

const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => datatype.number({ min: 0, max: 25 })),
        backgroundColor: '#FEEA61',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => datatype.number({ min: 0, max: 25 })),
        backgroundColor: '#FBD49B',
      },
      {
        label: 'Dataset 3',
        data: labels.map(() => datatype.number({ min: 0, max: 25 })),
        backgroundColor: '#F7B32F',
      },
    ],
  };

const Home = ({sellerProducts,handleSellerProducts})=>{
    const navigate = useNavigate()
    const location = useLocation()
    const loginStatus = location.state ? location.state : "shopper"
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate("/auth",{state:{loginStatus:"shopper"}})
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
    return(
        <div>
            <Navbar loginStatus={loginStatus}/>
            {
            loginStatus === "shopper" ? 
            <div className='home-container'>
                <Carousel>
                    <Carousel.Item>
                        <Row>
                            <Col className='home-content-wrapper'>
                                <div className='content-con'>
                                    <h1>SHOP WITH UTMOST <br/><span className='style-text'>STYLE</span></h1>
                                    <p>Shop from the latest trendy clothes to the best gadgets. With star shopper you save 10% every time you shop!</p>
                                    <Button className='browse-btn'
                                    style={{padding: "0.5rem 4rem",backgroundColor:'#5471FD'}}
                                    onClick={()=>navigate("/products")}
                                    >Browse Products</Button>
                                    <p>Products available from :</p>
                                    <div className='product-com-wrapper'>
                                        <img src={productCom1} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom2} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom3} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom4} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom5} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom6} className='product-company-logo' alt='product-company'/>
                                    </div>
                                </div>
                            </Col>
                            <Col className='home-img-wrapper'>
                                <img src={carouselOneImg} alt='carousel-1' className='carousel-img'/>
                            </Col>
                        </Row>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Row>
                            <Col className='home-content-wrapper'>
                                <div className='content-con'>
                                    <h1>SHOP WITH UTMOST <br/><span className='style-text'>STYLE</span></h1>
                                    <p>Shop from the latest trendy clothes to the best gadgets. With star shopper you save 10% every time you shop!</p>
                                    <Button className='browse-btn'
                                    style={{padding: "0.5rem 4rem",backgroundColor:'#5471FD'}}
                                    onClick={()=>navigate("/products")}
                                    >Browse Products</Button>
                                    <p>Products available from :</p>
                                    <div className='product-com-wrapper'>
                                        <img src={productCom1} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom2} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom3} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom4} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom5} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom6} className='product-company-logo' alt='product-company'/>
                                    </div>
                                </div>
                            </Col>
                            <Col className='home-img-wrapper'>
                                <img src={carouselTwoImg} alt='carousel-2' className='carousel-img'/>
                            </Col>
                        </Row>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Row>
                            <Col className='home-content-wrapper'>
                                <div className='content-con'>
                                    <h1>SHOP WITH UTMOST <br/><span className='style-text'>STYLE</span></h1>
                                    <p>Shop from the latest trendy clothes to the best gadgets. With star shopper you save 10% every time you shop!</p>
                                    <Button className='browse-btn'
                                    style={{padding: "0.5rem 4rem",backgroundColor:'#5471FD'}}
                                    onClick={()=>navigate("/products")}
                                    >Browse Products</Button>
                                    <p>Products available from :</p>
                                    <div className='product-com-wrapper'>
                                        <img src={productCom1} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom2} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom3} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom4} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom5} className='product-company-logo' alt='product-company'/>
                                        <img src={productCom6} className='product-company-logo' alt='product-company'/>
                                    </div>
                                </div>
                            </Col>
                            <Col className='home-img-wrapper'>
                                <img src={carouselThreeImg} alt='carousel-3' className='carousel-img'/>
                            </Col>
                        </Row>
                    </Carousel.Item>
                </Carousel>
            </div>
            :
            <div className='seller-page'>
                <div className='sales-performance'>//here the bar graph seller section
                    <h3 style={{fontSize:"24px"}}>SALES PERFORMANCE</h3>
                    <Bar options={options} data={data} className='bar-chart'/>;
                </div>
                <div className='your-products'>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                        <h3 style={{fontSize:"24px"}}>YOUR PRODUCTS</h3>
                        <button style={{marginLeft:"1rem",width:"fit-content"}} className='add-to-cart-btn' onClick={()=>navigate("/addproduct",{state:loginStatus})}>Add New Product</button>
                    </div>
                    <div className='purchases-con' style={{margin:"4rem 0",alignItems:"flex-start",backgroundColor:"transparent",padding:"0",overflowY:"auto",height:"60vh"}}>
                    {
                        Object.keys(sellerProducts).map(cartId=>{
                            const {title,imgUrl,discount,price} = sellerProducts[cartId]
                            return(
                                
                                <div key={cartId} style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",margin:"0 1.5rem"}}>
                                    <img src={imgUrl} alt={title} style={{width:"120px",height:"120px"}} className='purchase-product-img'/>
                                    <h4 style={{fontSize:"14px",lineHeight:"0"}}>{title}</h4>
                                    <div>
                                        <span style={{fontSize:"14px",fontWeight:"700"}} className='purchases-price'>${price}</span>
                                        <span style={{fontSize:"12px",color:"green",marginLeft:"1rem"}}>({discount}% OFF)</span>
                                    </div>
                                    <div style={{display:"flex",justifyContent:"space-between",marginTop:"1rem"}}>
                                        <button style={{width:"55px",padding:"0.3rem 0.5rem",borderRadius:"16px",fontSize:"12px"}} className='add-to-cart-btn' onClick={()=>{
                                            navigate("/addProduct",{state:sellerProducts[cartId]})
                                        }}>Edit</button>
                                        <button style={{backgroundColor:"#FF5757",width:"55px",padding:"0.3rem 0.5rem",borderRadius:"16px",fontSize:"12px"}} className='add-to-cart-btn' onClick={()=>{
                                            const storedData = localStorage.getItem("userId");
                                            const yourObject = JSON.parse(storedData);
                                            const { user_type,user_id} = getUserDetails(yourObject)
                                            delete sellerProducts[cartId]
                                            const updatedSellerProductsData = {[user_id] :{"items" : sellerProducts} }    
                                            axios.post('http://localhost:5000/product/add',updatedSellerProductsData)
                                              .then((res)=>{/*console.log(Res.data.message)*/})
                                              .catch((error)=>{
                                                console.log(error)
                                            })
                                            handleSellerProducts({...sellerProducts},"deleteProduct")
                                        }}>Delete</button>
                                    </div>
                                </div>
                            )
                        })
                    }
            </div>
                </div>
            </div>
            }
        </div>
    )
}

export default Home