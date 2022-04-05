import React,{useState} from 'react'
import Headercomponent from "../commanComponent/Headercomponent"
import {useHistory} from "react-router-dom"
import "../login/login.css"
import axios from "axios"
import {setuserData} from '../utils/authenticationOperations';


function Login() {
  const [data,setData]=useState({Email:'',Password:''})

  

  const signin="Register"
 const path="/register"
 const history = useHistory()
 const routeregister=()=>{
 history.push('/register')

 }

 const routeorder= async()=>{
   console.log(data)
  await axios.post("http://localhost:5000/api/users/login",data, {
    headers:{
      "Content-Type":"application/json"
        }
    }
    ).then(async (res)=>{
        console.log(res)
       await setuserData(res.data.token,res.data.user_id)
      //  localStorage.setItem('token',res.data.token)
      //  localStorage.setItem('user_id',res.data.user_id)
        if(res.status === 200){
        history.push('/productview')
        }else{
          window.alert('data invaild')
        }
    })
  }
 const changeData=(e)=>{
  e.preventDefault()
  setData({...data,[e.target.name]:e.target.value})
}
  return (
    <div className="login-parent">
    <Headercomponent registration={signin} action={path}/>
    <div className='login-details'>
    <div  className="login-btn">
      <div  className="login-details1">
     <h1>Product Cart</h1>
     </div>
     <div className='login-details2'>
       <p>Don't Have An Account?</p>
       
       <button onClick={routeregister}>Register</button>


     </div>
    </div>


    <div className='login'>
      <h1>SIGN IN</h1>
      <input type="text" name="Email" onChange ={changeData} placeholder="Enter Valid Email"></input>
      <br/>
      <input type="password"  name='Password' onChange ={changeData}  placeholder='Password'></input>
      <p>Forget password?</p>
        <button onClick={routeorder}>
          Sign in
        </button>
 

      
     </div>
     </div>
     <div>
   
     </div>
    </div>
  )
}

export default Login
