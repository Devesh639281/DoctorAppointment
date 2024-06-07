import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { Layout } from "../component/Layout";
import moment from "moment";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const getAppointment = async () => {
    try {
      const res = await axios.get("/api/v1/user/user-appointments", {
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
  useEffect(() => {
    getAppointment();
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
  ];
  return (
    <Layout>
      <h1>Appointments List</h1>
      <Table columns={columns} dataSource={appointments} />
    </Layout>
  );
};

export default Appointments;
