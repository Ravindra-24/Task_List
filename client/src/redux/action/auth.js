import toast from "react-hot-toast";
import * as api from "../api";

// Helper function to display error messages using toast
const errorBox = (error) => {
  if (!error) return;
  error.forEach((err) => {
    return toast.error(err.msg);
  });
};

// Action to sign up a user
export const signupUser =
  (authData, navigate, setProgress, setLoading) => async (dispatch) => {
    try {
      setProgress(30);
      const response = await api.signup(authData);
      dispatch({ type: "AUTH", payload: response.data });
      localStorage.setItem("token", response.data.token);
      setProgress(70);
      toast.success(response.message);
      setProgress(100);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

// Action to log in a user
export const loginUser =
  (authData, navigate, setLoading, setProgress) => async (dispatch) => {
    try {
      setProgress(30);
      const responseData = await api.login(authData);
      setProgress(70);
      dispatch({ type: "AUTH", payload: responseData.data });
      localStorage.setItem("token", responseData.data.token);
      setProgress(100);
      toast.success(responseData.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
      setProgress(100);
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

// Action to request a password reset
export const forgotPassword =
  (email, navigate, setLoading, setProgress) => async (dispatch) => {
    try {
      setProgress(30);
      const response = await api.forgot(email);
      setProgress(70);
      toast.success(response.message);
      navigate("/login");
      setProgress(100);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

// Action to reset the user's password
export const resetPassword =
  (token, password, navigate, setLoading, setProgress) => async (dispatch) => {
    try {
      setProgress(30);
      const response = await api.reset(token, password);
      setProgress(70);
      toast.success(response.message);
      navigate("/login");
      setProgress(100);
    } catch (error) {
      if (error.response.data.data || error.response.data.message) {
        errorBox(error.response.data.data);
        toast.error(error.response.data.message);
      }
    } finally {
      setProgress(100);
      setLoading(false);
    }
  };

// Action to validate the user's token and load user data
export const ValidateUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return;
    const responseData = await api.validate(token);
    if (responseData === null) return;
    dispatch({
      type: "AUTH",
      payload: {
        token,
        user: responseData.data.user,
        profilePicture: responseData.data.profilePicture,
      },
    });
    toast.success(responseData.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
