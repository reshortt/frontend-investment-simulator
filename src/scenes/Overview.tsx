import { useEffect, useState } from "react";
import { getBalance, getUser } from "../APIService";
import { AUTH_TOKEN_KEY } from "../constants";
const jwt = require("jsonwebtoken");

function Overview() {
  const token = sessionStorage.getItem(AUTH_TOKEN_KEY);
  console.log("token = ", token);
  const [user, setUser] = useState<Record<string, unknown>>({});
  const [balance, setBalance] = useState(0);
  const [yesterdayBalance, setYesterdayBalance] = useState(0);
  console.log("Calling get user");

  useEffect(() => {
    getUser().then((userThatWasFound) => {
      setUser(userThatWasFound);
      getBalance(false).then((balance) => setBalance(balance));
      getBalance(true).then((yesterdayBalance) =>
        setYesterdayBalance(yesterdayBalance)
      );
    });
  }, [user._id]);

  const userName = user.name;

  return (
    <div className="Overview">
      {
        <label>
          {" "}
          Balance for {userName} is ${balance}{" "}
        </label>
      }
      <br />
      <label> Day Change: ${balance - yesterdayBalance}</label>
      <br />
      <label> Total Gain/Loss: ${balance - 1000000}</label>
      <header className="Overview-header"></header>
    </div>
  );
}

export default Overview;
