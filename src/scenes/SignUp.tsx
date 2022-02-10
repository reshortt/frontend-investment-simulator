import React, { ChangeEvent, useEffect, useState } from "react";

import fetch from "node-fetch";
import { Button, Form, Input } from "antd";

function SignUp() {

  const handleSignUpButtonClick = (values:any) => {
    const fetchData = async () => {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.userID,
          password: values.password,
          name: values.name,
        }),
      };
      const response = await fetch(
        "http://localhost:3005/signup",
        requestOptions
      );

      const status: number = response.status;
      const json: string = await response.json();

      if (status === 200) {
        window.location.assign("/login")
        console.log(
          "json response of successful add is " + JSON.stringify(json)
        );
        window.alert("Welcome, " + values.name + ". Your account was successfully created.")
      }
      else {
        window.alert ("Signup failed: " + JSON.stringify(json))
      }
    };
    fetchData();
  };

  const formItemLayout = {
    labelCol: {
      span: 2,
      offset: 0,
    },
    wrapperCol: {
      span: 10,
      offset: 1,
    },
  };

  return (
    <Form 
    name="signup" {...formItemLayout}
    onFinish={handleSignUpButtonClick}
    >
            <Form.Item
        label="Name"
        name="name"
        rules={[
          {
            required: true,
            message: "Please input your name",
          },
        ]}
      >
        <Input placeholder="Fred Smith" />
      </Form.Item>
       <Form.Item
        label="User ID"
        name="userID"
        rules={[
          {
            required: true,
            message: "Please input your user ID",
          },
        ]}
      >
        <Input placeholder="stock-market-whiz"/>
      </Form.Item>


      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password",
          },
        ]}
      >
        <Input.Password autoComplete="new-password"/>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 3,
        }}
      >
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>


    
  )
}

export default SignUp;
