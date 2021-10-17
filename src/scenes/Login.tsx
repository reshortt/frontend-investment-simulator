import React, { useEffect, useState } from 'react';

import fetch from 'node-fetch'
import { Link } from 'react-router-dom';
type LoginPropType = {setLoggedIn:(val:boolean)=>void, isLoggedIn:boolean}

function Login(props:LoginPropType) {

  const handleLoginButtonClick = () => {
    // todo: query mongo db to get login user name and pw that user submitted
    // query server wiht those values and see whether they're valid
    // call props.setLoggedIn if so
    props.setLoggedIn(!props.isLoggedIn)
  }
 
  return (
    <div className="Login">
      <label> User Id </label>
      <input/>
      <br/>
      <label> Password </label>
      <input/>
    <br/>
      <button 
        onClick={handleLoginButtonClick}>
        Login
      </button>
      <br/>
      <label>No account?</label>
      { /*todo: go to SignUp page*/ }
      <Link to = "/signup"> Sign Up </Link>
      <header className="Login-header">
      </header>
    </div>
  );
}

export default Login;