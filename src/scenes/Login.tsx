import { ChangeEvent, useState } from "react";

import { Link } from "react-router-dom";

import { connect } from 'react-redux';
import { withRouter} from "react-router-dom";
import {doLogin} from "../APIService"

function Login() {
  const [typedPassword, setTypedPassword] = useState("");
  const [typedEmail, setTypedEmail] = useState("");

  const handleLoginButtonClick = () => {
    console.log("handle button click");
    // todo: query mongo db to get login user name and pw that user submitted
    // query server wiht those values and see whether they're valid
    // call props.setLoggedIn if so
;
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


// TODO when we figure out our state structure we can type this better.
const mapStateToProps = (state: any) => {
  return {
    profile: state.user.profile
  }
}

export default connect(mapStateToProps)(withRouter(Login))

