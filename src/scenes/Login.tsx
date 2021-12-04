import { ChangeEvent, useState } from "react";

import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import {doLogin} from "../APIService"

function Login() {
  const [typedPassword, setTypedPassword] = useState("");
  const [typedEmail, setTypedEmail] = useState("");

  const handleLoginButtonClick = () => {
    doLogin(typedEmail, typedPassword)
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

export default Login

