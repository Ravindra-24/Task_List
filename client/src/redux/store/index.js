import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk"; // Thunk middleware for handling asynchronous actions
import { composeWithDevTools } from "redux-devtools-extension"; // DevTools extension for debugging
import rootReducer from "../reducres/index"; // Import the root reducer

// Define middleware to be used in the store (currently only thunk middleware)
const middleware = [thunk];

// Create the Redux store with the rootReducer and middleware
const store = createStore(
  rootReducer, // Combine reducers to create the root reducer
  composeWithDevTools(applyMiddleware(...middleware)) // Enhance with middleware and DevTools
);

export default store;
