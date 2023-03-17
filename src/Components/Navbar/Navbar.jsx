import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { asyncsignout } from "../../store/userActions";
import "./Navbar.css";
import { socket } from "../../App";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, loading, isAuthenticated, error } = useSelector(
    (state) => state.user
  );
  const handleSignout = () => {
    dispatch(asyncsignout());
    socket.disconnect();
  };
  return (
    <>
      <nav className="dark">
        <div className="nav-wrapper">
          <NavLink to="/" className="nav-logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOOv7XBukiInQ4y5smDY4G6z64GOQ14uSz_Q&usqp=CAU"
              alt=""
            />
            Chat App
          </NavLink>
          {isAuthenticated && (
            <ul className="nav-right">
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "active" : "")}
                  to="/profile"
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => (isActive ? "" : "")}
                  onClick={handleSignout}
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <div className="main">
        <Outlet />
      </div>
    </>
  );
};

export default Navbar;
