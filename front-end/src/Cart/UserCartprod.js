import React from 'react'
import { useState } from 'react'
import Cancelpopup from '../commanComponent/Cancelpopup'
import axios from 'axios'
import {getToken,getUserid,setUserAdress} from '../utils/authenticationOperations';
import {useHistory} from "react-router-dom"

function Cartprod(props) {    
  const [isCancel, setIsCancel] = useState(false)
  const currUser =getUserid()
  const history = useHistory()
  // const address = localStorage.getItem("userAdress")
  const config = {headers:{
    token :  getToken()
  }}
  const Cancelitem = () =>{
    setIsCancel(!isCancel)
  }
  
  const Removeitem=()=>{
    if (props.action==="cart"){
    axios.delete(`http://localhost:5000/userremoveitem?id=${props.Product_ID}&userID=${currUser}`,config)
    .then(res=>{
      console.log(res)
      Cancelitem()
      window.location.href="/usercart"
    })
  }else{
    axios.delete(`http://localhost:5000/userremovewishitem?id=${props.Product_ID}&userID=${currUser}`,config)
    .then(res=>{
      console.log(res)
      Cancelitem()
      window.location.href="/userwishlist"
    })
  }
  }


  return (
    <div className='parent_user_all_products'>
        <div className='cart_products_all_data'>
            <div className='user_cart_image'><img src={props.image} className='img_user_product' /></div>
            <div className='Price_btn_cart'>
            <div className='user_cart_price'>{props.product_name}<br/> Rs.{props.price} <br/>rating:{props.rating}</div>
        
            <div className='user_cart_remove_btn'><button className='usercart_removeitem-btn' onClick={Cancelitem}>Remove Item</button></div>
            </div>
        </div>
        {isCancel && <Cancelpopup
        content={<>
        <div className="purpleheader"></div>
        <div className="item_remove_alert">Alert</div>
        <div className="proceedtocancel">Are you sure you want to cancel the order containing {props.product_name} of worth Rs.{props.price}</div>
    
        <br></br>
        <button className='proceed-btn'  onClick={Removeitem}>Proceed</button>
      </>}
      handleClose={Cancelitem}
    />}

    </div>
  )
}

export default Cartprod