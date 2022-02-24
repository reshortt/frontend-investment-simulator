
import { Button, Form, Input } from "antd";
import { doSignup } from "../APIService";

function SignUp() {
  const handleSignUpButtonClick = (values: any) => {
    doSignup(values.userID, values.password, values.name).then(
      (success: boolean) => {
        if (success) {
          window.location.assign("/login");
          window.alert(
            "Welcome, " +
              values.name +
              ". Your account was successfully created."
          );
        } else {
          window.alert("Error creating account");
        }
      }
    );
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
    <Form name="signup" {...formItemLayout} onFinish={handleSignUpButtonClick}>
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
        <Input placeholder="stock-market-whiz" />
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
        <Input.Password autoComplete="new-password" />
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
  );
}

export default SignUp;
