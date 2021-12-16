import { useEffect, useState } from "react";
import { getUser } from "../APIService";
import { formatCurrency, getAccountValue, getGain } from "../Calculations";
import { INITIAL_GIFT, User } from "../types";
const jwt = require("jsonwebtoken");

function Overview() {
  const [user, setUser] = useState<User>();
  const [loadingUser, setLoadingUser] = useState<boolean>(false);

  useEffect(() => {
    setLoadingUser(true);
    getUser().then((foundUser) => {
      foundUser && setUser(foundUser);
      setLoadingUser(false);
    });
  }, []);

  const getBalanceString = (user: User|undefined): string => {
    if (loadingUser) return "...";
    if (!user) return "";
    return formatCurrency(getAccountValue(user));
  };

  const getGainString = (user: User|undefined): string => {
    if (loadingUser) return "...";
    if (!user) return "";
    return formatCurrency(getGain(user));
  };

  return (
    <div className="Overview">
      {
        <label>
          Balance
          {":  "}
          {getBalanceString(user)}
        </label>
      }
      <br />

      <label> Total Gain/Loss: </label>
      <label
        style={
          (user && !loadingUser && getGain(user) < 0) ? { color: "red" } : { color: undefined }
        }
      >
        {"  "}
        {getGainString(user)}
      </label>
      <header className="Overview-header"></header>
    </div>
  );
}

export default Overview;
