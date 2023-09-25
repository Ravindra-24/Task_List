const task =[];
  
  const taskReducer = (state = task, action) => {
    const { payload, type } = action;
    switch (type) {
      case "TASKS":
        return payload;
      default:
        return state;
    }
  };
  
  export default taskReducer;