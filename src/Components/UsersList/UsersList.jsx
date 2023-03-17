import React, { useEffect, useState } from "react";
import "./UsersList.css";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { socket } from "../../App";
const UsersList = ({ setselectedUser, setMsgs, users, setusers }) => {
  const { user } = useSelector((state) => state.user);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    socket.on("users", (data) => {
      setusers(data);
    });
  }, [socket]);
  const handleSelectUser = (user) => {
    setselectedUser(user);
    setMsgs([]);
    socket.emit("user messages", user);
    setToggle(!toggle);
    setusers((users) => {
      return users.map((single) => {
        if (single.userId === user.userId) {
          single.status = false;
        }
        return single;
      });
    });
  };
  return (
    <>
      <div className="toggle-list" onClick={() => setToggle(!toggle)}>
        <MdKeyboardDoubleArrowRight
          style={{
            transform: toggle ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </div>
      <div className={`user-list ${toggle ? "toggle" : ""}`}>
        <div className="my-profile">
          <img
            id="dropdown"
            draggable="false"
            src={`${user?.avtar?.url}`}
            alt=""
          />
          <div className="username">{user?.name.split(" ")[0]} (You) </div>
        </div>
        <div className="users">
          {users.map(
            (single, i) =>
              user._id !== single.userId && (
                <div
                  key={i}
                  onClick={() => handleSelectUser(single)}
                  className="user dark"
                >
                  <img src={`${single?.image}`} alt="" />
                  <div className="username">{single?.username} </div>
                  {single?.status && <div className="blue-dot"></div>}
                  <div
                    className={`status ${
                      single?.connected ? "online" : "offline"
                    }`}
                  ></div>
                </div>
              )
          )}
        </div>
      </div>
    </>
  );
};

export default UsersList;
