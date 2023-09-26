// Define the initial state for the task reducer as an empty array
const initialState = [];

// Define the task reducer function
const taskReducer = (state = initialState, action) => {
  const { payload, type } = action;

  // Handle different action types
  switch (type) {
    case "TASKS":
      // When tasks are fetched, update the state with the payload (task data)
      return payload;
    default:
      // For other actions, return the current state
      return state;
  }
};

export default taskReducer;
