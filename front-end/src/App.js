
import './App.css';
import React from 'react';
import Register from "./register/Register";
import Login from "./login/Login"
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Productviewbeforelogin from "../src/products/Productviewbeforelogin"

import Productview from '../src/products/Productview';
import Usercart from "../src/Cart/UserCartlist"
import Wishlist  from './Cart/Wishlist';




function App() {
  return (
  

    < BrowserRouter>
    <div>
    <Switch>
   
      <Route path='/' exact component={Productviewbeforelogin}/>
    
      <Route  path="/login" exact component={Login}/>
     
      <Route path="/register"   exact><Register/></Route>
      <Route path='/productview'  exact ><Productview></Productview></Route>
      <Route path='/usercart' exact component={Usercart}/>
      <Route path='/userwishlist' exact component={Wishlist}/>
  
      {/* <PrivateRoute path='/orderc' exact  ><OrderConfirm/></PrivateRoute>  */}
       </Switch>
    </div>
  </BrowserRouter>
  );
}

export default App;
