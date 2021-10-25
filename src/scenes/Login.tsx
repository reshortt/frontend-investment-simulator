import React, { ChangeEvent, useEffect, useState } from "react";

import fetch from "node-fetch";
import { Link } from "react-router-dom";
import { setConstantValue } from "typescript";
import { AUTH_TOKEN_KEY } from "../constants"


import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import { ActionCreators } from '../redux/actionCreators/profile'

type LoginPropType = {
  setLoggedIn: (val: boolean) => void;
  isLoggedIn: boolean;
};
//TODO Type this better
function Login(props: any) {
  const [typedPassword, setTypedPassword] = useState("");
  const [typedEmail, setTypedEmail] = useState("");

  const doLogin = () => {
    console.log("handle button click");
    // todo: query mongo db to get login user name and pw that user submitted
    // query server wiht those values and see whether they're valid
    // call props.setLoggedIn if so
    //props.setLoggedIn(!props.isLoggedIn)
    const fetchData = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: typedEmail, password: typedPassword }),
      };
      const response = await fetch(
        "http://localhost:3005/login",
        requestOptions
      );

      switch (response.status) {
        case 200:
          const token = await response.text();
          sessionStorage.setItem(AUTH_TOKEN_KEY, token)
          console.log("Successful login: " + token);
          props.dispatch(ActionCreators.login(token));

          // TODO log someone in, make it available everywhere

          window.location.assign("/overview")
          break;

        case 401:
          // todo: better way to show error
          console.log(await response.text());
          break;

        default:
          // 500 is possible for critical server erropr
          console.log("unexpected login response");
          break;
      }
    };
    fetchData();
  };

  const handleLoginButtonClick = () => {
    doLogin()
  }

  const handleUserInput = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "typedPassword":
        setTypedPassword(e.target.value);
        break;
      case "typedEmail":
        setTypedEmail(e.target.value);
        break;
    }
  };

  return (
    <div className="Login">
      <label> Email </label>
      <input name="typedEmail" onChange={handleUserInput} />
      <br />
      <label> Password </label>
      <input name="typedPassword" onChange={handleUserInput} />
      <br />
      <button onClick={handleLoginButtonClick}>Login</button>
      <br />
      <label>No account?</label>
      <Link to="/signup"> Sign Up </Link>
      <header className="Login-header"></header>
    </div>
  );
}


// TODO when we figure out our state structure we can type this better.
const mapStateToProps = (state: any) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(Login))

