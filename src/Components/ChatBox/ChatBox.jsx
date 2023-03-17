import React, { useCallback, useEffect, useState } from "react";
import "./ChatBox.css";
import { socket } from "../../App";
import { useSelector } from "react-redux";
const ChatBox = ({ selectedUser, msgs }) => {
  const { user } = useSelector((state) => state.user);
  const ref = React.useRef(null);
  const sendMessage = (e) => {
    e.preventDefault();
    socket.emit("private", {
      message: e.target.msg.value,
      to: selectedUser.userId,
    });
    e.target.msg.value = "";
    ref.current.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  };
  useEffect(() => {
    ref.current.scrollTo(0, ref.current.scrollHeight);
  }, []);
  return (
    <div className="chat-box">
      <div className="chat-box-profile">
        <img src={`${selectedUser?.image}`} alt="" />
        <div>
          <div className="username">{selectedUser?.username}</div>
          {selectedUser.connected && <div className="status">online</div>}
        </div>
      </div>
      <div ref={ref} className="chat-box-main">
        {msgs.map((e, i) => (
          <div
            key={i}
            className={`chat-box-content ${
              user?._id === e.from ? "right" : ""
            }`}
          >
            <div className="chat-box-message">
              {e.message}
              <div className="triangle"></div>
            </div>
            <div className="chat-box-time">12:00</div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="chat-box-footer">
        <input type="text" name="msg" placeholder="Type a message" />
        <button type="submit">
          <div className="svg-wrapper-1">
            <div className="svg-wrapper">
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </div>
          <span>Send</span>
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
