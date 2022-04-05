import React from 'react'
import { removeToken,getToken } from '../utils/authenticationOperations';
import {useHistory} from "react-router-dom"



function ProductHeaderCompo(props) {
  const history = useHistory()
  // const token = getToken()
  const GoToCart = () =>{
   history.push('/usercart')
  }
  const UserLogout=()=>{
    if (props.bool){
      removeToken()
    }

  }
 
  return (
    <div>
        <div class="product_header">
     <div class="nav-bar">
        <h1>Product Cart</h1>
      </div>
      <div class="navbar">
          <a href="#"><p>Filter</p></a>
          <a href="#"><p>About as</p></a>
          {props.bool && 
          <div className='cart_img_prod'>
          
          <img width={65} onClick={GoToCart} height={60} src='https://cdn.iconscout.com/icon/free/png-512/shopping-cart-1433158-1211836.png' alt="cart pic"/>
          <h2>Go to cart</h2>
        </div>
        }
        
       <a className='logout' onClick={UserLogout} href={props.action}>{props.display}</a>
      
      </div>
   
      </div>
    </div>
  )
}

export default ProductHeaderCompo
