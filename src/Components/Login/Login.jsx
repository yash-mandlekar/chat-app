import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { asyncsignup } from "../../store/userActions";
const Login = () => {
  const Dispatch = useDispatch();
  const login = useGoogleLogin({
    onSuccess: (codeResponse) =>
      Dispatch(asyncsignup(codeResponse.access_token)),
  });
  return (
    <div>
      <button
        onClick={login}
        className={`curvy_box cp`}
      >
        <h4>Get Started</h4>
      </button>
    </div>
  );
};

export default Login;
