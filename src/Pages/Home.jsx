import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../App";
import ChatBox from "../Components/ChatBox/ChatBox";
import Login from "../Components/Login/Login";
import UsersList from "../Components/UsersList/UsersList";
import Loader from "../Components/Loader/Loader";
import "./Home.css";
const Home = () => {
  const {user,loading,isAuthenticated,error} = useSelector((state) => state.user);
  const [msgs, setMsgs] = useState([]);
  const [chatAlert, setChatAlert] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMsgs((prev) => [...prev, data.message]);
      console.log(data);
    });
    socket.on("disconnect_user", (data) => {
      console.log(data);
    });
  }, [socket]);
  return (
    <>
    {loading ?
    <Loader />:
      isAuthenticated ? (
        <div className="home">
          <UsersList />
          <ChatBox />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
