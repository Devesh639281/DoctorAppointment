import React from "react";
import axios from "axios";
import "../styles/ForgetPassword.css";
import { Form, Input, message } from "antd";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinishHandler = async (values) => {
    dispatch(showLoading());
    const res = await axios.post("/api/v1/user/forgot-password", values);
    dispatch(hideLoading());
    console.log(res);

    if (res.data.success) {
      message.success("Password Reset Successfully");
      navigate("/login");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertivcal"
          onFinish={onFinishHandler}
          className="register-form">
          <h1 className="text-center">Reset Password</h1>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="answer" name="answer">
            <Input type="text" placeholder="Tell Me Father Name" required />
          </Form.Item>
          <Form.Item label="newPassword" name="newPassword">
            <Input type="text" required />
          </Form.Item>
          <button className="btn btn-primary" type="submit">
            Reset
          </button>
        </Form>
      </div>
    </>
  );
};

export default ForgetPassword;
