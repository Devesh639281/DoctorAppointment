import { Layout } from "../../../component/Layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, message } from "antd";
import moment from "moment";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const getDoctorAppointment = async () => {
    try {
      const res = await axios.get("/api/v1/user/doctor-appointments", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/user/update-appointment-status",
        {
          appointmentId: record._id,
          status,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
      getDoctorAppointment();
    }
  };
  useEffect(() => {
    getDoctorAppointment();
  }, []);
  // antd table col
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },

    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD:MM:YYYY")} &nbsp;
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}>
                Approved
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "reject")}>
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Doctor Appointments List</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default DoctorAppointments;
