import React, { useEffect, useState } from "react";
import { Layout } from "../component/Layout";
import { useParams, useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import axios from "axios";

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();

  // eslint-disable-next-line
  const [isAvaliable, setisAvaliable] = useState(false);
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctors/getDoctorById",
        { doctorId: params.doctorId },
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

  const handleBoooking = async () => {
    try {
      if (!date && !time) {
        return alert("Date and Time is Required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        navigate(`/doctor/payment-page/${doctors._id}`);
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const handleAvaliability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-avalibility",
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      // message.error(error);
    }
  };
  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout className="bookingPage">
      <h3 className="mt-2">Booking Page</h3>
      <div className="container m-2">
        <h4>
          <b>
            Dr. {doctors.firstName} {doctors.lastName}
          </b>
        </h4>
        <h4>Specialist:{doctors.specialization}</h4>
        {doctors.timings && doctors.timings.length > 0 && (
          <h4>
            Timings: {doctors.timings[0]}:{doctors.timings[1]}
          </h4>
        )}

        <h4>Fee:{doctors.feePerConsultation}</h4>

        <div className="d-flex flex-column w-50">
          <DatePicker
            className="m-2"
            format="DD-MM-YYYY"
            onChange={(value) => {
              setDate(moment(value).format("DD:MM:YYYY"));
            }}
          />
          <TimePicker
            format="HH:mm"
            className="m-2"
            onChange={(value) => setTime(value ? value.format("HH:mm") : null)}
          />

          <button
            className="btn btn-primary mt-2 m-2"
            onClick={handleAvaliability}>
            Check Avilability
          </button>
          <button className="btn btn-dark mt-2 m-2" onClick={handleBoooking}>
            Book Now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
