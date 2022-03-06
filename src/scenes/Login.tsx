import { Button, Form, Input, message as AntMessage, Spin } from "antd";
import { useState } from "react";
import {
  doLogin,
  getUserInfo,
  isLoggedIn,
} from "../APIService";
import "antd/dist/antd.css";
import { UserInfo } from "../types";

function Login() {
  const [loggingIn, setLoggingIn] = useState<boolean>(false);
  
  const onFinish = (values: any) => {
    setLoggingIn(true);
    doLogin(values.username, values.password).then((success: boolean) => {
      setLoggingIn(false);
      if (!success) {
        AntMessage.error("Invalid credentials");
      } else {
        getUserInfo().then((info: UserInfo | null) => {
          AntMessage.success(
            "User " + info?.name + " successfully logged in",
            1
          ).then(() => {
            window.location.assign("/");
          });
        });
      }
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onSignUp = () => {
    window.location.assign("/signup");
  };

  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="User name"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        {loggingIn || isLoggedIn() ? (
          <Spin size="small" />
        ) : (
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        )}
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <label>No Account? </label>

        <Button type="link" onClick={onSignUp}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Login;
