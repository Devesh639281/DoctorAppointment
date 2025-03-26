import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useSelector } from "react-redux";
import Spinner from "./component/Spinner";
import ProtectedRoutes from "./component/ProtectedRoutes";
import PublicRoutes from "./component/PublicRoutes";
import ApplyDoctors from "./pages/ApplyDoctors";
import ForgetPassword from "./pages/ForgetPassword";
import NotificationPage from "./pages/NotificationPage";
import Doctors from "./pages/AdminPages/Doctors";
import Users from "./pages/AdminPages/Users";
import Profile from "./pages/AdminPages/doctor/Profile";
import BookingPage from "./pages/BookingPage";
import PaymentPage from "./pages/PaymentPage";
import Appointments from "./pages/Appointments";
import DoctorAppointments from "./pages/AdminPages/doctor/DoctorAppointments";
import UserProfile from "../src/pages/UserProfile";

function App() {
  const { loading } = useSelector((state) => state.alerts);
  // const { user } = useSelector((state) => state.user);

  return (
    <>
      {" "}
      <Router>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/apply-doctors"
              element={
                <ProtectedRoutes>
                  <ApplyDoctors />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoutes>
                  <Register />
                </PublicRoutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoutes>
                  <Login />
                </PublicRoutes>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <PublicRoutes>
                  <ForgetPassword />
                </PublicRoutes>
              }
            />
            <Route
              path="/appointments"
              element={
                <ProtectedRoutes>
                  <Appointments />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor-appointments"
              element={
                <ProtectedRoutes>
                  <DoctorAppointments />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/notification"
              element={
                <ProtectedRoutes>
                  <NotificationPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoutes>
                  <Users />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/admin/doctors"
              element={
                <ProtectedRoutes>
                  <Doctors />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor/profile/:_id"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/profile/:_id"
              element={
                <ProtectedRoutes>
                  <UserProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor/book-appointment/:doctorId"
              element={
                <ProtectedRoutes>
                  <BookingPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/doctor/payment-page/:doctorId"
              element={
                <ProtectedRoutes>
                  <PaymentPage />
                </ProtectedRoutes>
              }
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
