import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Productview.css";
import Product from "../products/UserProduct";
import ProductHeaderCompo from "../commanComponent/ProductHeaderCompo";


function Productviewbeforelogin(props) {
  const [products, setProducts] = useState([]);
  const [prodLength, setProdLen] = useState(0);
  const action='/login'
  const display='Signin'
 
  useEffect(() => {
    axios.get("http://localhost:5000/api/users/productview").then((res) => {
      console.log(res);
      setProducts(res.data);
      setProdLen(res.data.length);
    });
  }, []);
 
  return (
    <div>
    {prodLength && <div >
        {/* <button className="" onClick={routeToCartList}>Go To Cart</button> */}
      <ProductHeaderCompo bool={false} action={action} display={display}/>
        </div>}
        <div className="allproducts">

      
      {prodLength &&      
        products.map((product) => {
          return (
              <Product bool={false}{...product} />
          );
        })}
          </div>
          <div>
          <footer className='footer-component'>
                    <p>2022 &#169; Product Cart</p>
                 
            </footer>
            </div>
    </div>
  );
}

export default  Productviewbeforelogin;
