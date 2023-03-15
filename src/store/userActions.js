import {
  loaduser,
  errors,
  signout,
  setloadingfalse,
  setLoading,
} from "./userSlice";
import axios from "../Components/Axios/Axios";
import Axios from "axios";

export const asyncsignup = (newuser) => async (dispatch) => {
  try {
    const { data } = await Axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${newuser}`
    );
    const res = await axios.post("/signup", {
      name: data.name,
      username: data.email,
      email: data.email,
      password: data.id,
      avtar: {
        public_id: data.email,
        url: data.picture,
      },
    });
    dispatch(loaduser(res.data.user));
  } catch (err) {
    console.log(err);
    dispatch(errors(err.response.data.message));
  }
};

export const asyncloaduser = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const { data } = await axios.get("/loaduser");
    dispatch(loaduser(data.user));
  } catch (err) {
    dispatch(setloadingfalse());
  }
};

export const asyncsignout = () => async (dispatch) => {
  try {
    dispatch(setLoading())
    const res = await axios.get("/signout");
    dispatch(signout());
  } catch (err) {
    dispatch(errors(err.response.data.message));
  }
};
