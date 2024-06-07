import React from "react";
// import { adminMenu, userMenu } from "./data/data";
import { message, Badge } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // ===============================================
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctors",
      icon: "fa-solid fa-syringe",
    },
    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "fa-solid fa-user",
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "fa-solid fa-syringe",
    },
    {
      name: "Profile",
      path: `/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];

  // **************DoctorMenu*************************
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user",
    },
  ];
  const Sidebarmenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h5>Doctor Appointment</h5>
            </div>
            <hr />
            <div className="menu">
              {Sidebarmenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}>
                  <i className="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div
              className="body"
              style={{ overflowX: "hidden", maxHeight: "calc(100vh - 120px)" }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
