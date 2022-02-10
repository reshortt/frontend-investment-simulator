import { Button, Form, Input } from "antd";
import { doLogin } from "../APIService";

function Login() {

  const onFinish = (values: any) => {
    doLogin(values.username, values.password).then((success:boolean) => {
      if (success)
        window.alert("Succcesful login for user " + values.username)
      else
        window.alert("Invalid credentials");
    })
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onSignUp = () => {
    window.location.assign("/signup")
  }

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
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <label>No Account? </label>
        <Button type = "link" onClick={onSignUp}>
          Sign Up
        </Button>
      </Form.Item>

    </Form>
  );

  // return (
  //   <div className="Login">
  //     <label> Email </label>
  //     <input name="typedEmail" onChange={handleUserInput} />
  //     <br />
  //     <label> Password </label>
  //     <input name="typedPassword" onChange={handleUserInput} />
  //     <br />
  //     <button onClick={handleLoginButtonClick}>Login</button>
  //     <br />
  //     <label>No account?</label>
  //     <label> Sign Up </label>
  //     <header className="Login-header"></header>
  //   </div>
  // );
}

export default Login;
