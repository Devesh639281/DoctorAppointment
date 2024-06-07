import React, { useState, useEffect } from "react";
import { Layout } from "../../../component/Layout";
import { message, Form, Row, Col, Input, TimePicker } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { showLoading, hideLoading } from "../../../redux/features/alertSlice";
import moment from "moment";

const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getDoctorsInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctors/getDoctorInfo",
        { userId: params._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        setDoctor(res.data.data);
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsInfo();
    // eslint-disable-next-line
  }, []);

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/doctors/updateProfile",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      dispatch(hideLoading());
      message.error("Something Went Wrong");
    }
  };
  return (
    <Layout>
      <h1>Manage Doctor Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={onFinishHandler}
          className="m-3 form-layout"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0], "HH:mm"),
              moment(doctor.timings[1], "HH:mm"),
            ],
          }}>
          <h4>Personal Details:</h4>
          <Row gutter={20} className="form-input-padding">
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  { required: true, message: "Please enter your first name" },
                ]}>
                <Input type="text" placeholder="Your first Name" />
              </Form.Item>
            </Col>

            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[
                  { required: true, message: "Please enter your last name" },
                ]}>
                <Input type="text" placeholder="Your Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No."
                name="phone"
                rules={[
                  { required: true, message: "Please enter your phone number" },
                ]}>
                <Input type="number" placeholder="Your Contact Number" />
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
                ]}>
                <Input type="email" placeholder="Your Email Address" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"
                name="website"
                rules={[
                  { required: true, message: "Please enter your website" },
                ]}>
                <Input type="text" placeholder="Your Website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                rules={[
                  {
                    required: true,
                    message: "Please enter your clinic address",
                  },
                ]}>
                <Input type="text" placeholder="Clinic Address" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details:</h4>
          <Row gutter={20} className="form-input-padding">
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                rules={[
                  {
                    required: true,
                    message: "Please enter your specialization",
                  },
                ]}>
                <Input type="text" placeholder="Your Specialization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                rules={[
                  { required: true, message: "Please enter your experience" },
                ]}>
                <Input type="text" placeholder="Your Experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fee Per Consultation"
                name="feePerConsultation"
                rules={[
                  {
                    required: true,
                    message: "Please enter your consultation fees",
                  },
                ]}>
                <Input type="text" placeholder="Consultation Fees" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                rules={[
                  { required: true, message: "Please enter your timings" },
                ]}>
                <TimePicker.RangePicker
                  format="HH:mm"
                  defaultValue={[
                    moment(doctor.timings[0], "HH:mm"),
                    moment(doctor.timings[1], "HH:mm"),
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary form-btn" type="submit">
                  UpdateDoctorProfile
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default Profile;
