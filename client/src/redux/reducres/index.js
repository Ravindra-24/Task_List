import { combineReducers } from "redux";

import authReducer from "./authReducer"; // Import the authentication reducer
import taskReducer from "./taskReducer"; // Import the task reducer

// Combine the individual reducers into a root reducer
const rootReducer = combineReducers({
  authReducer,   // Combine the authentication reducer
  taskReducer,  // Combine the task reducer
});

export default rootReducer;
