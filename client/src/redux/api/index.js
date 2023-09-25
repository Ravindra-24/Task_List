import axios from "axios";
import store from "../../redux/store";
import toast from "react-hot-toast";

export const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  // timeout: 5000,
  headers: {},
});

API.interceptors.request.use(
  (req) => {
    const auth = store.getState().authReducer;
    if (auth.token) {
      req.headers.authorization = `Bearer ${auth.token}`;
    }
    return req;
  },
  (error) => {
    console.log(error);
    toast.error(error.response.message);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    if (response) return response.data;
  },
  (error) => {
    if (error.axiosError) {
      toast.error(error.message);
    }
    // console.log(error);
    if (error.response.status === 401) {
      store.dispatch({ type: "LOGOUT" });
    }
    return Promise.reject(error);
  }
);

setInterval(() => {
  API.get("/keep-alive-endpoint") // Replace with your server's actual endpoint
    .then((response) => {
      console.log("keep-alive request sent");
      if (response.status !== 200) {
        console.error(
          "Keep-alive request failed:",
          response.status,
          response.statusText
        );
      }
    })
    .catch((error) => {
      console.error("Error sending keep-alive request:", error.message);
    });
}, 900000);

export const validate = (token) => API.get(`/auth/validate/${token}`);

export const signup = (authData) => API.post("/auth/signup", authData);
export const login = (authData) => API.post("/auth/login", authData);
export const forgot = (email) => API.post("/auth/forgot-password", email);
export const reset = (token, password) =>
  API.post(`/auth/reset-password/${token}`, password);

export const createTask = (formData) => API.post("/task", formData);
export const getAllTasks = () => API.get("/task");
export const deleteTasks = (todo_id) => API.delete(`/task/${todo_id}`);
export const updateTasksStaus = (todo_id) =>
  API.patch(`/task/status/${todo_id}`);
export const updateTasks = (id, formData) =>
  API.patch(`/task/todo/${id}`, formData);
