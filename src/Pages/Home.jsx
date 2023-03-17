import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { socket } from "../App";
import ChatBox from "../Components/ChatBox/ChatBox";
import Login from "../Components/Login/Login";
import UsersList from "../Components/UsersList/UsersList";
import Loader from "../Components/Loader/Loader";
import "./Home.css";
const Home = () => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const [msgs, setMsgs] = useState([]);
  const [selectedUser, setselectedUser] = useState(null);
  const [users, setusers] = useState([]);
  useEffect(() => {
    if (user) {
      socket.auth = {
        username: user?.name,
        userId: user?._id,
        image: user?.avtar?.url,
      };
      socket.connect();
    }
  }, [user]);
  const handleMsgStatus = useCallback((data,status) => {
    setusers((users) => {
      return users.map((single) => {
        if (single.userId === data.from) {
          single.status = status;
        }
        return single;
      });
    });
  }, []);
  const privateMessage = useCallback((data) => {
    if(data.from === selectedUser?.userId){
      setMsgs((msgs) => [...msgs, data]);
    }else{  
      handleMsgStatus(data,true);
    }
  }, [selectedUser,handleMsgStatus]);
  const userMessages = useCallback((data) => {
    setMsgs(data.messages); 
  }, []);
  useEffect(() => {
    socket.on("private", (data) => privateMessage(data));
    socket.on("user messages", (data) => userMessages(data));
  }, [socket, privateMessage]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : isAuthenticated ? (
        <div className="home">
          <UsersList users={users} setusers={setusers} selectedUser={selectedUser} setselectedUser={setselectedUser} setMsgs={setMsgs} />
          {selectedUser && <ChatBox selectedUser={selectedUser} msgs={msgs} />}
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;
