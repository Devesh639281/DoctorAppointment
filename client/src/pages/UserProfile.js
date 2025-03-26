import React, { useEffect } from "react";
import { Layout } from "../component/Layout";
import { Form, Input, Row, Col, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();

  const getUserInfo = async () => {
    try {
      const res = await axios.get(`/api/v1/user/getUser Info/${user._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        // You can set the user data directly in the form if needed
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserInfo();
    // Include getUser Info in the dependency array
  }, [user._id]); // Use user._id to ensure it runs when user changes

  const onFinishHandler = async (values) => {
    try {
      const res = await axios.post(
        `/api/v1/user/updateUser Profile/${params._id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <h1>Manage User Profile</h1>
      {user && (
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="m-3 form-layout"
          initialValues={{
            ...user,
          }}
        >
          <h4>Personal Details:</h4>
          <Row gutter={20} className="form-input-padding">
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Id"
                name="_id"
                rules={[{ required: true, message: "_id Here" }]}
              >
                <Input type="text" placeholder="Not Changeable" disabled />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="name"
                rules={[
                  { required: true, message: "Please enter your name" },
                ]}
              >
                <Input type="text" placeholder="Your Name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Answer"
                name="answer"
                rules={[
                  { required: true, message: "Please enter your answer" },
                ]}
              >
                <Input type="text" placeholder="Your Answer" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Is Doctor"
                name="isDoctor"
                rules={[{ required: true, message: "Please specify if a doctor" }]}
              >
                <Input type="text" placeholder="Is Doctor" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email address",
                  },
                ]}
              >
                <Input type="email" placeholder="Your Email Address" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Is Admin"
                name="isAdmin"
                rules={[{ required: true, message: "Please specify if an admin" }]}
              >
                <Input type="text" placeholder="Is Admin" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary form-btn" type="submit">
                  Update User Profile
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default UserProfile;
