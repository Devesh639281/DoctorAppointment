import React, { useState, useEffect } from "react";
import { Layout } from "../../component/Layout";
import { Table, message } from "antd";
// import { useLocation } from "react-router-dom";
import axios from "axios";
// import { resetWarned } from "antd/es/_util/warning";

const Doctors = () => {
  const [doctor, setDoctors] = useState([]);
  // const location = useLocation();

  // getUser
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/get-all-doctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(res);
      if (res.data.success) {
        setDoctors(res.data.data);
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(res);
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong Here");
    }
  };
  // antd table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <div className="d-flex">
          <span>
            {record.firstName} {record.lastName}
          </span>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}>
              Approved
            </button>
          ) : (
            <button className="btn btn-danger">Rejected</button>
          )}
        </div>
      ),
    },
  ];
  return (
    <Layout>
      <h1>Doctor list</h1>
      <Table columns={columns} dataSource={doctor} />
    </Layout>
  );
};

export default Doctors;
