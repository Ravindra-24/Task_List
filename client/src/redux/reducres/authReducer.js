// Define the initial state for the authentication reducer
const initialState = {
  token: null,           // User authentication token
  user: null,            // User information
  profilePicture: null,  // User profile picture
  loaded: false,         // Flag to indicate if authentication data is loaded
};

// Define the authentication reducer function
const authReducer = (state = initialState, action) => {
  const { payload, type } = action;

  // Handle different action types
  switch (type) {
    case "AUTH":
      // When the user is authenticated, update the state with payload data
      return { ...state, ...payload, loaded: true };
    case "LOGOUT":
      // When the user logs out, clear local storage and reset the state
      localStorage.clear();
      return { ...initialState, loaded: true };
    default:
      // For other actions, return the current state
      return state;
  }
};

export default authReducer;
