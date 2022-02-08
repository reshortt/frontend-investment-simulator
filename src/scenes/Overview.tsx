import { Form, Spin } from "antd";
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

  const getAccountValueString = (user: User): string => {
    return formatCurrency(getAccountValue(user));
  };

  const getGainString = (user: User): string => {
    return formatCurrency(getGain(user));
  };

  const formItemLayout = {
    labelCol: {
      span: 2,
      offset: 0,
    },
    wrapperCol: {
      span: 36,
      offset: 1,
    },
  };

  return (
    <>
      <br />
      <Form name="overview" {...formItemLayout}>
        <Form.Item label="Name" labelAlign="right">
          {loadingUserInfo || !userInfo ? (
            <Spin size="small" />
          ) : (
            <label>{userInfo.name}</label>
          )}
        </Form.Item>

        <Form.Item label="User ID" labelAlign="right">
          <span className="ant-form-text">
            {userInfo && !loadingUserInfo && userInfo.email ? (
              userInfo.email
            ) : (
              <Spin size="small" />
            )}
          </span>
        </Form.Item>

        <Form.Item label="Account Created" labelAlign="right">
          <span className="ant-form-text">
            {userInfo && !loadingUserInfo ? (
              formatDate(userInfo.created, true)
            ) : (
              <Spin size="small" />
            )}
          </span>
        </Form.Item>

        <Form.Item label="Account Value" labelAlign="right">
          <span className="ant-form-text">
            {!user || loadingUser ? (
              <Spin size="small" />
            ) : (
              getAccountValueString(user)
            )}
          </span>
        </Form.Item>

        <Form.Item label="Cash Balance" labelAlign="right">
          <span className="ant-form-text">
            {userInfo && !loadingUserInfo ? (
              formatCurrency(userInfo.cash)
            ) : (
              <Spin size="small" />
            )}
          </span>
        </Form.Item>

        <Form.Item label="Total Gain/Loss" labelAlign="right">
          <span className="ant-form-text">
            {loadingUser || !user ? (
              <Spin size="small" />
            ) : (
              <label
                style={
                  getGain(user) < 0 ? { color: "red" } : { color: undefined }
                }
              >
                {getGainString(user)}
              </label>
            )}
          </span>
        </Form.Item>
      </Form>
    </>
  );
}

export default Overview;
