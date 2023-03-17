import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import io from "socket.io-client";
import { asyncloaduser } from "./store/userActions";
// https://chat-app-cyan-five.vercel.app
console.log(process.env.REACT_APP_API_URL.split("/"));
export const socket = io.connect("https://chat-app-cyan-five.vercel.app");
const App = () => {
  const Dispatch = useDispatch();
  React.useEffect(() => {
    Dispatch(asyncloaduser());
  },[]);
  return (
    <>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
