import { Form, Spin } from "antd";
import { useEffect, useState } from "react";
import { getAccount, getUserInfo } from "../APIService";
import {
  formatCurrency,
  formatDate,
  getAccountValue,
  getGain,
} from "../Calculations";
import { Account, UserInfo } from "../types";
import "antd/dist/antd.css";

function Overview() {
  const [account, setAccount] = useState<Account>();
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [loadingAccount, setLoadingUser] = useState<boolean>(false);
  const [loadingUserInfo, setLoadingAccount] = useState<boolean>(false);

  useEffect(() => {
    setLoadingAccount(true);
    getUserInfo().then((foundUserInfo) => {
      foundUserInfo && setUserInfo(foundUserInfo);
      setLoadingAccount(false);
      setLoadingUser(true);
      getAccount().then((foundUser) => {
        foundUser && setAccount(foundUser);
        setLoadingUser(false);
      });
    });
  }, []);

  const getAccountValueString = (account: Account): string => {
    return formatCurrency(getAccountValue(account));
  };

  const getGainString = (account: Account): string => {
    return formatCurrency(getGain(account));
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
            {userInfo && !loadingUserInfo && userInfo.userID ? (
              userInfo.userID
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
            {!account || loadingAccount ? (
              <Spin size="small" />
            ) : (
              getAccountValueString(account)
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
            {loadingAccount || !account ? (
              <Spin size="small" />
            ) : (
              <label
                style={
                  getGain(account) < 0 ? { color: "red" } : { color: undefined }
                }
              >
                {getGainString(account)}
              </label>
            )}
          </span>
        </Form.Item>
      </Form>
    </>
  );
}

export default Overview;
