import React,{useState} from 'react';
import Headercomponent from "../commanComponent/Headercomponent"
import {useHistory} from "react-router-dom"
import "../register/register.css"
import axios from "axios"



function Register() {
  const  [data,setDetails]=useState({
    Full_Name:"",
    Email:"",Password:'',Phone:''})
const history = useHistory()
  const routesignin=()=>{
    history.push('/login')
  
 
  }

  const changeData=(e)=>{
    e.preventDefault()
    setDetails({...data,[e.target.name]:e.target.value})
  }
  const submitData=()=>{
    console.log(data)
    axios.post("https://productapp-backend.herokuapp.com/api/users/register",data,{
      headers:{
        "Content-Type":"application/json"
          }
      }).then((res)=>{
          console.log(res)
          if(res.status === 201){
            history.push('/login')
          }else{
            window.alert("user already register")
          }
      })
    }
  
   
   

 
 const signin="Signin"

 const path="/login"
  return (
    <div className="register-parent">
    <Headercomponent registration={signin} action={path}/>
    <div className='user-register'>
    <div className="register-btn">
      <div className="register-details">
     <h1>Productcart</h1>
     </div>
     <div className='register-details2'>
       <p>Already Have Account</p>
   
       <button onClick={ routesignin} > Signin</button>
      

     </div>
    </div>

    <div className='registration-form'>
      <div className='register-name'>
        <h1>REGISTER</h1>
      </div>
      
      <div className='forms'>
      <form>
      <div className='form-1'>
    
       <input type="text" name="Full_Name" required onChange= {changeData}   placeholder='Enter your Fullname'/>
       <br/>
      
       <input type="text" name="Phone"  maxLength={10}  required onChange={ changeData}  placeholder='Enter your phone'  />
       <br/>

      </div>
      <div className='form-2'>
       <input type="text" name="Email"  required  onChange={ changeData}   placeholder='Email'  />
       <br/>
       <input type="password" name="Password"  required  onChange={ changeData}   placeholder='password'/>
   
      
      </div>
      <div className='user-data-btn'>
        <input type='checkbox'/>
        <span><a href="#">I agree to Terms & Condition receiving marketing  and promotinal materials</a></span>
        <br/>
        <button type="button" onClick={submitData}>Register</button>
      </div>
      </form>
     

      </div>
     
    
     
      
     </div>
        
    </div>
    </div>
  )
}

export default Register



