import React, { useState } from "react";
import axios from "axios";
import {getToken,getUserid} from '../utils/authenticationOperations';
import {useHistory} from "react-router-dom"

function UserProduct(props) {
  const UserProducts = props
  const [wishshow,setwishshow]=useState(true)
 
const history = useHistory()
  const userid= localStorage.getItem("user_id")
  const config = {headers:{
    token :  getToken()
  }}
  const [show, setShow] = useState(true)
  
    const addToCart = async  () => {
      setShow(false)
      if (props.bool){
        await  axios.post(`http://localhost:5000/UserAddtocart?id=${props.Product_ID}&userID=${userid}`,UserProducts ,config)
        .then((res)=>{console.log('aded to cart',res)})
      }else{
        history.push('/login')
      }
    
    }
    const addToWishlist = async  () => {
      
      setwishshow(false)
      if (props.bool){
        await  axios.post(`http://localhost:5000/UserAddtowishlist?id=${props.Product_ID}&userID=${userid}`,UserProducts ,config)
        .then((res)=>{console.log('aded to wish list',res)})
      }else{
        history.push('/login')
      }
    
    }
   
  return (
    <div className="product-parent">
      <div className="userproducts">
        <div className="product_img_class">
          <img src={props.image} className="userproduct-img" />
        </div>
        <div className="userproduct_data">
          <div className="prod_price_rating">
            <div className="product-name">{props.product_name}</div>
            <div className="product-price">Rs.{props.price}</div>
            <div className="product-rating"> rating : {props.rating}</div>
          </div>
          <div className="userproduct_cart_btn">
            {show && <button className="useraddcart-btn" onClick={addToCart}>
              Add to Cart
            </button>}
            {

              wishshow && <button className="useraddcart-btn" onClick={addToWishlist}>
                wishlist
            </button>

            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProduct;
