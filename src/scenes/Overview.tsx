import React, { useEffect, useState } from 'react';
import { isJSDocUnknownTag } from 'typescript';
import { AUTH_TOKEN_KEY } from '../constants';
const jwt = require("jsonwebtoken");


const getBalance =  () : number =>  {
    // todo: get balance from mongo db
    return 1074324.45
  }



  
// import { connect } from 'react-redux';
// import { withRouter} from "react-router-dom";
// import { ActionCreators } from '../../../../actions/profile';

// // const RightPanel = ...

// const mapStateToProps = (state) => {
//   return {
//     profile: state.user.profile
//   }
// }

function Overview() {

  const token = sessionStorage.getItem(AUTH_TOKEN_KEY)
  console.log("token = " , token);

  return (
    <div className="Overview">

      {/*<label> Balance for {myObj.userName} ( {myObj.userEmail}) ${getBalance()} </label>*/}
      <br/>
      
    
      <br/>
      <header className="Overview-header">
      </header>
    </div>
  );
}

export default Overview