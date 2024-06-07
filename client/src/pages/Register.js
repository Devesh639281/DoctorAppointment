import React from "react";
import { Form, Input, message, Select } from "antd";
import "../styles/RegisterStyle.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Option } = Select;
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
      const response = await axios.post("/api/v1/user/register", values);
      console.log(response);
      dispatch(hideLoading());

      if (response.data.success) {
        message.success("Register Successfully");
        navigate("/login");
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertivcal"
          onFinish={onFinishHandler}
          className="register-form">
          <h1 className="text-center">Register</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Form.Item label="Answer" name="answer">
            <Input type="text" placeholder="Enter Your Father Name" required />
          </Form.Item>
          <Form.Item label="Admin" name="isAdmin" required>
            <Select placeholder="isAdmin">
              <Option value="true">True</Option>
              <Option value="false">False</Option>
            </Select>
          </Form.Item>
          <Link to="/login" className="m-2">
            Already Register Login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
