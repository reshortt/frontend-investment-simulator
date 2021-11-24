import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { isJSDocUnknownTag } from "typescript";
import { getBalance, getUser } from "../APIService";
import { AUTH_TOKEN_KEY } from "../constants";
const jwt = require("jsonwebtoken");

function Overview() {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  console.log("token = ", token);
  const [user, setUser] = useState<Record<string, unknown>>({});
  const [balance, setBalance] = useState(0);
  console.log("Calling get user");

  //TODO Use a useEffect hook to safely retrieve the information once.
  useEffect(() => {
    getUser().then((userThatWasFound) => {
      setUser(userThatWasFound);
      getBalance().then((userBalance) => setBalance(userBalance))
    });
  },[user._id]);

  const userName = user.name;

  return (
    <div className="Overview">
    {<label> Balance for {userName}  is ${balance} </label>}
      <br />
        {userName} is {user._id}
        
      <br />
      {`${user.name}`}
      <header className="Overview-header"></header>
    </div>
  );
}

export default Overview;
