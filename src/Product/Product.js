import React,{useEffect, useState} from 'react'
import './Product.css'
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import axios from 'axios';


//Display product details
function Product({id,title,image,price,rating}){

    const rate = 5 - rating;
    return(<>
       <Link to='/productDetail'><div className="product">
            <div className="product_information">
                <p>{title}</p>
                <p className="product_price" >
                    <small>LKR</small>
                    <strong>{price}</strong>
                </p>
                <div className='product_rating'>{
                    Array(rating)
                    .fill()
                    .map(() => (
                        rate > 0 && (<>
                            <AiFillStar style={{height:'2rem', width:'2rem', color:'yellow'}}/>
                            </>)
                    ))
                }
                       {Array(rate)
                            .fill()
                            .map(() => ( 
                                <AiOutlineStar style={{height:'2rem', width:'2rem'}}/>
                             ))
                             }    
                </div>
            </div>
                <Link to={`/addToCart/${id}`}><img src={image} alt="" style={{height:'180px', width:'200px'}}/></Link> 
                <div style={{display:'flex', justifyContent:'space-around', marginTop:'1rem'}}>
                    <Link to={`/confirm-order/${1}`}><button className='AddToCart' style={{width:'8rem', height:'3rem'}} >Add to Cart</button></Link> 
                    <Link to='/samplePayment'> <button className='BuyNow'style={{width:'7rem', height:'3rem', borderRadius:'5px'}}>Buy Now</button></Link> 
                </div>
        </div>
        </Link> 
        </>
    )
}

export default Product;