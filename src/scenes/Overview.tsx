import { useEffect, useState } from "react";
import { getUser, getUserInfo } from "../APIService";
import {
  formatCurrency,
  formatDate,
  getAccountValue,
  getGain,
} from "../Calculations";
import { User, UserInfo } from "../types";

function Overview() {
  const [user, setUser] = useState<User>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [loadingUser, setLoadingUser] = useState<boolean>(false);
  const [loadingUserInfo, setLoadingUserInfo] = useState<boolean>(false);

  useEffect(() => {
    setLoadingUserInfo(true);
    getUserInfo().then((foundUserInfo) => {
      foundUserInfo && setUserInfo(foundUserInfo);
      setLoadingUserInfo(false);
      setLoadingUser(true);
      getUser().then((foundUser) => {
        foundUser && setUser(foundUser);
        setLoadingUser(false);
      });
    });
  }, []);

  const getAccountValueString = (user: User | undefined): string => {
    if (loadingUser || loadingUserInfo) return "...";
    if (!user) return "";
    return formatCurrency(getAccountValue(user));
  };

  const getGainString = (user: User | undefined): string => {
    if (loadingUser|| loadingUserInfo) return "...";
    if (!user) return "";
    return formatCurrency(getGain(user));
  };

  return (
    <div className="Overview">
      <label>
        Name:
        {"  "}
      </label>
      <label>{userInfo && !loadingUserInfo && userInfo.name}</label>
      <br />
      <label>Account Created:</label>
      <label>
        {"  "}
        {userInfo && !loadingUserInfo && formatDate(userInfo.created, true)}
      </label>
      <br />
      <label>
        Cash Balance:
      </label>
      <label>
        {"  "}
        {userInfo && !loadingUserInfo && formatCurrency(userInfo.cash)}
      </label>
      <br/>
      <label>
        Account Value:
        {"  "}
        {getAccountValueString(user)}
      </label>
      <br />

      <label> Total Gain/Loss: </label>
      <label
        style={
          user && !loadingUser && getGain(user) < 0
            ? { color: "red" }
            : { color: undefined }
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
