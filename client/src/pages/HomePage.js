import React, { useEffect, useState } from "react";
import axios from "axios";
import { Layout } from "../component/Layout";
import { Row } from "antd";
import "../styles/Layout.css";
import DoctorList from "../component/data/DoctorList";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/user/getAllDoctors",

        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      {/* <Row>{JSON.stringify(doctors, null, 4)}</Row> */}
      {/* as a props pass doctor in DoctorList */}
      <Row>
        {doctors && doctors.map((doctor) => <DoctorList doctor={doctor} />)}
      </Row>
    </Layout>
  );
};

export default HomePage;
