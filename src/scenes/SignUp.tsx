import React, { ChangeEvent, useEffect, useState } from "react";

import fetch from "node-fetch";
//type LoginPropType = {setLoggedIn:(val:boolean)=>void, isLoggedIn:boolean}

function SignUp() {
  const [typedPassword, setTypedPassword] = useState("");
  const [typedEmail, setTypedEmail] = useState("");
  const [typedName, setTypedName] = useState("");

  const handleSignUpButtonClick = () => {
    const fetchData = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: typedEmail,
          password: typedPassword,
          name: typedName,
        }),
      };
      const response = await fetch(
        "http://localhost:3005/signup",
        requestOptions
      );

      const status: number = await response.status;
      const json: string = await response.json();

      if (status === 200) {
        window.location.assign("/login")
        console.log(
          "json response of successful add is " + JSON.stringify(json)
        );
      }
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
      case "typedName":
        setTypedName(e.target.value);
        break;
    }
  };

  return (
    <div className="SignUp">
      <label> Name </label>
      <input name="typedName" onChange={handleUserInput} />
      <br />
      <label> Email </label>
      <input name="typedEmail" onChange={handleUserInput} />
      <br />
      <label> Password </label>
      <input name="typedPassword" onChange={handleUserInput} />
      <br />
      <button onClick={handleSignUpButtonClick}>Create Account</button>
      <br />
      <header className="SignUp-header"></header>
    </div>
  );
}

export default SignUp;
