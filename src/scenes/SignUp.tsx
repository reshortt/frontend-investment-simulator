import React, { useEffect, useState } from 'react';

import fetch from 'node-fetch'
//type LoginPropType = {setLoggedIn:(val:boolean)=>void, isLoggedIn:boolean}

function SignUp() {

  const handleSignUpButtonClick = () => {
    // todo: create investor in mongodb, give him $1M, and go to overview page
  }

  const userNameValid =  () : boolean =>  {
    // todo: check user name meets requirements and doesn't already exist in mongodb
    return true
  }

  const passwordValid = () :boolean => {
      // todo: check password meets requirements
      return false
  }
 
  return (
    <div className="SignUp">
      <label> User Id </label>
      <input/>
      {!userNameValid()} && <label color="red"> Invalid User Name </label> 
      <br/>
      <label> Password </label>
      <input/>
      {!passwordValid()} && <label color="red"> Invalid password </label>
    <br/>
      <button 
        onClick={handleSignUpButtonClick}
        disabled = {!userNameValid || !passwordValid}
        >
        Create Account
      </button>
      <br/>
      <header className="SignUp-header">
      </header>
    </div>
  );
}

export default SignUp