import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Productview.css";
import UserProduct from "../products/UserProduct";
import ProductHeaderCompo from "../commanComponent/ProductHeaderCompo";

function Productview(props) {
 
  const [products, setProducts] = useState([]);
  const [prodLength, setProdLen] = useState(0);
 
 
  const action='/login'
  const display='Logout'

  useEffect(() => {
    axios.get("https://productapp-backend.herokuapp.com/api/users/productview").then((res) => {
      console.log(res);
      setProducts(res.data);
      setProdLen(res.data.length);
    });
  }, []);
  return (
    <div>
    {prodLength && <div >
   <ProductHeaderCompo action={action} bool={true} display={display}/>
        </div>}
        <div className="allproducts">

      
      {prodLength &&      
        products.map((product) => {
          return (
              <UserProduct bool={true}  {...product} />
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

export default Productview;
