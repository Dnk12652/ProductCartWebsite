import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cartprod from './UserCartprod'
import './Cartlist.css'
import {getToken,setUserAdress,getUserid} from '../utils/authenticationOperations';
// import Addresscomp from './Addresspopup'
import Addresspopup from '../commanComponent/Addresspopup'
import {useHistory} from "react-router-dom"
import ProductHeaderCompo from '../commanComponent/ProductHeaderCompo';


function Cartlist() {
    
    // const home = 'xyz'
    //console.log(home)
   const  history =useHistory()
    const home = localStorage.getItem("home")
    const currUser = getUserid()
    // console.log(currUser)
    const token = getToken()
    // console.log(currToken)
    const [cartProducts, setCartProducts] = useState([])
    const [prodLen, setProdLen] = useState(0)
    const [show, setShow] = useState(false)
    const [address, setAddress] = useState({house_name:''})
    const [editAddress, setEditAddress] = useState({house_name:home})
    const [editShow, setEditShow] = useState(false)

    const config = {headers:{
      token : token
    }}

    const addAddressshow = () =>{
      setShow(!show)
    }
    const addingAddress = () =>{
      axios.post(`http://localhost:5000/addaddress?id=${currUser}`,address,config)
      .then((res)=>{console.log("address added");
      setShow(!show)
   
      setUserAdress(address.house_name)
      history.push('/usercart')
    })
    }

    const editingAddress = () =>{
      axios.put(`http://localhost:5000/edithomeaddress?id=${currUser}`,editAddress,config)
      .then((res)=>{console.log("address added");
      setEditShow(!editShow)
      setUserAdress(editAddress.house_name) 
      history.push('/usercart')
    })
    }
    const editAddressroute= () =>{
      setEditShow(!editShow)
    }
    const routeToAllProd = () =>{
    history.push('/productview')
    }
    
    useEffect(async()=>{
        await axios.get(`http://localhost:5000/Usercart?id=${currUser}`,config)
        .then((res)=>{console.log(res)
          setCartProducts(res.data)
        setProdLen(res.data.length)})
    },[])
  return (
    <div className='parentUsercart'>
         <div>
       <ProductHeaderCompo action={'/productview'} display={"product"}/>
          </div>
        {prodLen ? <div>
         
        <div>{cartProducts.map((cartprod)=>{return <Cartprod {...cartprod} />})}</div>
        <div className='user_cart_address_btn'>
        {home==null || ""?<button className="button_twobtn_color" onClick={editAddressroute}>Add Address</button>:<button className='button_twobtn_color' onClick={editAddressroute}>Edit Address</button>}
        <div className='address'>
        <div>Address:</div>
        <div><span>HomeAdress:</span><span>{home}</span></div>     
      
        </div>
        {show && <Addresspopup
        content={<>
        <label>Home:</label>
        <input className='UserAdresss' name='house_name' placeholder='Enter House Address' onChange={(e)=>{setAddress({'house_name':e.target.value})}}/>
        <br />
       
        <button className='address_btn_color' onClick={addingAddress}>proceed</button>
        </>}
      handleClose={addAddressshow}
    />}
    {editShow && <Addresspopup
        content={<>
        <label>Home Address:</label>
        <input className='UserAdresss' name='house_name' placeholder='Edit Home Address' value={editAddress.house_name} onChange={(e)=>{setEditAddress({'house_name':e.target.value})}}/>
        <br/>
        <button className='address_btn_color' onClick={editingAddress}>proceed</button>
        </>}
      handleClose={editAddressroute}
    />}
    </div>

        </div>
        :<div className='emptyUsercart'>your Cart Is Empty..add products to productview below button
        <div className='zero_products_cart'>you need visit cart need some products?<button className='proceed_to_add_products' onClick={routeToAllProd}>Go to </button></div></div>}
        <div className='foraddress-btn'>
        
        </div>


    </div>
  )
}

export default Cartlist