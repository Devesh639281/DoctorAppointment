import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Layout } from "../component/Layout";
import { Tabs, message } from "antd";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const NotificationPage = () => {
  const dispatch = useDispatch();
  //   const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const handleMarkedAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
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
        // window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      message.error("Something Went Wrong Here");
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        {
          userId: user._id,
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
        // window.location.reload();
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      message.error("Something Went Wrong Here");
    }
  };
  return (
    <Layout>
      <h4 className="p-3 text-center">NotificationPage</h4>
      <Tabs>
        <Tabs.TabPane tab="unread" key={0} className="p-3">
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleMarkedAllRead}>
              Mark All Read
            </h4>
          </div>
          {user &&
            user.notification &&
            user.notification.map((notificationmsg) => (
              <div className="card" style={{ cursor: "pointer" }}>
                <div
                  className="card-text"
                  onClick={notificationmsg.onClickPath}>
                  {notificationmsg.message}
                </div>
              </div>
            ))}
        </Tabs.TabPane>
        <Tabs.TabPane tab="read" key={1} className="p-3">
          <div className="d-flex justify-content-end">
            <h4
              className="p-2 text-primary"
              style={{ cursor: "pointer" }}
              onClick={handleDeleteAllRead}>
              Delete All Read
            </h4>
          </div>
          {user &&
            user.seenNotification &&
            user.seenNotification.map((notificationmsg) => (
              <div className="card" style={{ cursor: "pointer" }}>
                <div
                  className="card-text"
                  onClick={notificationmsg.onClickPath}>
                  {notificationmsg.message}
                </div>
              </div>
            ))}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default NotificationPage;
