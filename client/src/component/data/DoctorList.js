import React from "react";
import { useNavigate } from "react-router-dom";

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="card m-4"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}>
        <div className="card-header">
          Dr.{doctor.firstName}
          {doctor.lastName}
        </div>
        <div
          className="card-body"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
          }}>
          <p>
            <b>Specialization</b>:{doctor.specialization}
          </p>
          <p>
            <b>Experience</b>:{doctor.experience}
          </p>
          <p>
            <b>Conultation Fee</b>:{doctor.feePerConsultation}
          </p>
          <p>
            <b>Contact</b>:{doctor.phone}
          </p>
          <p>
            <b>Timings</b>:{doctor.timings[0]}-{doctor.timings[1]}
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
