import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}/api` || "http://localhost:4000/api",
    withCredentials: true,
});

export default instance;
