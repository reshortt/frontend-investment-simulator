import { Form } from "antd";
import { useEffect, useState } from "react";
import { getUser, getUserInfo } from "../APIService";
import {
  formatCurrency,
  formatDate,
  getAccountValue,
  getGain,
} from "../Calculations";
import { User, UserInfo } from "../types";
import "antd/dist/antd.css";

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
    if (loadingUser || loadingUserInfo) return "...";
    if (!user) return "";
    return formatCurrency(getGain(user));
  };

  const getUserID = ():string => {
    if (loadingUserInfo || loadingUser || !userInfo) return "...";
    console.log("email for ", userInfo.name, " is ", userInfo.email)
    return userInfo.email
  };

  const formItemLayout = {
    labelCol: {
      span: 3,
      offset: 0,
    },
    wrapperCol: {
      span: 36,
    },
  };

  return (
    <>
      <br />
      <Form name="overview" {...formItemLayout}>
        <Form.Item label="Name" labelAlign="left">
          <span className="ant-form-text">
            {userInfo && !loadingUserInfo && userInfo.name
              ? userInfo.name
              : "..."}
          </span>
        </Form.Item>

        <Form.Item label="User ID" labelAlign="left">
          <span className="ant-form-text">{userInfo && !loadingUserInfo && userInfo.email
              ? userInfo.email
              : "..."}</span>
        </Form.Item>

        <Form.Item label="Account Created" labelAlign="left">
          <span className="ant-form-text">
            {userInfo && !loadingUserInfo
              ? formatDate(userInfo.created, true)
              : "..."}
          </span>
        </Form.Item>

        <Form.Item label="Account Value" labelAlign="left">
          <span className="ant-form-text">{getAccountValueString(user)}</span>
        </Form.Item>

        <Form.Item label="Cash Balance" labelAlign="left">
          <span className="ant-form-text">
            {userInfo && !loadingUserInfo
              ? formatCurrency(userInfo.cash)
              : "..."}
          </span>
        </Form.Item>

        <Form.Item label="Total Gain/Loss" labelAlign="left">
          <span className="ant-form-text">
            <label
              style={
                user && !loadingUser && getGain(user) < 0
                  ? { color: "red" }
                  : { color: undefined }
              }
            >
              {getGainString(user)}
            </label>
          </span>
        </Form.Item>
      </Form>
    </>
  );
}

export default Overview;
