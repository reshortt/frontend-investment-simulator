import { useEffect, useState } from "react";
import { getBalance, getUser } from "../APIService";
import { UserInfo } from "../types";
const jwt = require("jsonwebtoken");

function Overview() {
  const [user, setUser] = useState<UserInfo | null>();
  const [balance, setBalance] = useState(0);
  const [yesterdayBalance, setYesterdayBalance] = useState(0);
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [loadingBalance, setLoadingBalance] = useState<boolean>(false);
  const [loadingYesterdayBalance, setLoadingYesterdayBalance] =
    useState<boolean>(false);

  useEffect(() => {
    setLoadingUser(true);
    getUser().then((foundUser) => {
      setUser(foundUser);
      setLoadingUser(false);
      setLoadingBalance(true);
      getBalance(false).then((foundBalance) => {
        setBalance(foundBalance);
        setLoadingBalance(false);
      });
      setLoadingYesterdayBalance(true);
      getBalance(true).then((foundYesterdayBalance) => {
        setYesterdayBalance(foundYesterdayBalance);
        setLoadingYesterdayBalance(false);
      });
    });
  }, []);

  return (
    <div className="Overview">
      {
        <label>
          Balance
          {loadingUser ? "..." : "for " + user?.name + " "}
          is ${loadingBalance ? "..." : balance}
        </label>
      }
      <br />
      <label>
        {" "}
        Day Change $
        {loadingBalance || loadingYesterdayBalance
          ? "..."
          : balance - yesterdayBalance}
      </label>
      <br />
      <label> Total Gain/Loss </label>
      <label
        style={
          balance - 1000000.0 < 0 && !loadingBalance
            ? { color: "red" }
            : { color: undefined }
        }
      >
        {" "}
        ${loadingBalance ? "..." : balance - 1000000.0}
      </label>
      <header className="Overview-header"></header>
    </div>
  );
}

export default Overview;
