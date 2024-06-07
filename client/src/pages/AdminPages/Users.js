import React, { useState, useEffect } from "react";
import { Layout } from "../../component/Layout";
import axios from "axios";
import { Table } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);

  // getUser
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/v1/admin/getAllUser", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(data);
      if (data.success) {
        setUsers(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  // antd table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => (
        <div className="d-flex">
          <span>{record.isDoctor ? "YES" : "NO"}</span>
        </div>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger">Block</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1>User List</h1>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
};

export default Users;
