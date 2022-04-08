import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Productview.css";
import Eachprod from "./Eachprod";

function Productview() {
    const userid = localStorage.getItem("userID")
  const [products, setProducts] = useState([]);
  const [prodLength, setProdLen] = useState(0);
  const [address, setAddress] =useState([])
  const [cart, setCart]= useState(true)
  // const currToken = localStorage.getItem("token")
  const routeToCartList = () =>{
    window.location.href = '/cartlist'
  }
  // const config = {headers:{
  //     token : 
  // }}
  useEffect(() => {
    axios.get(`https://productapp-backend.herokuapp.com/users/productview`).then((res) => {
      console.log(res);
      setProducts(res.data);
      setAddress(res.address)
      setProdLen(res.data.length);
    });
  }, []);
  return (
    <div>
    {prodLength && 
    <div className="gotocart">
      <div className="availableprod">Hello, here are the products at store</div>
      <button className="forgotocartbtn" onClick={routeToCartList}>Go To Cart</button></div>}
      {prodLength &&      
        products.map((product) => {
          return (
              <Eachprod {...product} />
          );
        })}
    </div>
  );
}

export default Productview;
