import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";

import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      const regex =
        /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?~`-]).*$/;

      if (!values.password.match(regex)) {
        message.error(
          "Password must be at least one alphabet, one numeric, and one symbol."
        );
        return; // Stop execution if password validation fails
      }
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went Wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertivcal"
          onFinish={onFinishHandler}
          className="register-form">
          <h1 className="text-center">Login</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="m-2">
            Not Register then Register here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
          <div className="p-5">
            <button
              className="btn btn-danger ps-5"
              type="button"
              onClick={() => {
                navigate("/forgot-password");
              }}>
              Forgot Password
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Login;
