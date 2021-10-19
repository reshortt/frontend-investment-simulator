import React, { ChangeEvent, useEffect, useState } from "react";

import fetch from "node-fetch";
import { Link } from "react-router-dom";
import { setConstantValue } from "typescript";

type LoginPropType = {
  setLoggedIn: (val: boolean) => void;
  isLoggedIn: boolean;
};

function Login(props: LoginPropType) {
  const [typedPassword, setTypedPassword] = useState("");
  const [typedEmail, setTypedEmail] = useState("");

  const handleLoginButtonClick = () => {
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
      const data = await response.json();
      console.log("setting result to  " + data);
    };
    fetchData();
  };

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
      {/*todo: go to SignUp page*/}
      <Link to="/signup"> Sign Up </Link>
      <header className="Login-header"></header>
    </div>
  );
}

export default Login;
