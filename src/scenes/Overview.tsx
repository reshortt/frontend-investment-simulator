import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { isJSDocUnknownTag } from "typescript";
import { getUser } from "../APIService";
import { AUTH_TOKEN_KEY } from "../constants";
const jwt = require("jsonwebtoken");

const getBalance = (): number => {
  // todo: get balance from mongo db
  return 1074324.45;
};

function Overview() {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  console.log("token = ", token);
  const [user, setUser] = useState<Record<string, unknown>>({});
  console.log("Calling get user");

  //TODO Use a useEffect hook to safely retrieve the information once.
  useEffect(() => {
    getUser().then((userThatWasFound) => {
      setUser(userThatWasFound);
    });
  },[user._id]);

  const userName = user.name;

  return (
    <div className="Overview">
      {/*<label> Balance for {myObj.userName} ( {myObj.userEmail}) ${getBalance()} </label>*/}
      <br />
        {userName} is {user._id}
      <br />
      {`${user.name}`}
      <header className="Overview-header"></header>
    </div>
  );
}

export default Overview;
