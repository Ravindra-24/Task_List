const { Todo } = require("../schema/TaskSchema");
const { User } = require("../schema/UserSchema");

// API endpoint to get a user's todos
module.exports.getTodos = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    
    // Find the user by their ID
    const userId = await User.findById(id);
    if (!userId) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: null,
      });
    }
    
    // Fetch all todos associated with the user
    const todos = await Todo.find({ user: id });

    return res.status(200).json({
      message: "Todos fetched successfully",
      success: true,
      data: todos,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

// API endpoint to create a new todo
module.exports.createTodo = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    
    // Find the user by their ID
    const userId = await User.findById(id);
    if (!userId) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: null,
      });
    }

    // Extract title and description from the request body
    const { title, description } = req.body;
    
    // Create a new todo associated with the user
    const todo = await Todo.create({ title, description, user: userId._id });
    return res.status(201).json({
      message: "Todo created successfully",
      success: true,
      data: todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

// API endpoint to update a todo
module.exports.updateTodo = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    
    // Extract title and description from the request body
    const { title, description } = req.body;
    
    // Get the todo ID from the request parameters
    const { todoId } = req.params;
    
    // Find and update the todo
    const todo = await Todo.findOneAndUpdate(
      { _id: todoId },
      { title, description },
      { new: true }
    );
    return res.status(200).json({
      message: "Todo updated successfully",
      success: true,
      data: todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

// API endpoint to update the status (complete/incomplete) of a todo
module.exports.updateTodoStatus = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    
    // Get the todo ID from the request parameters
    const { todoId } = req.params;
    
    // Find the todo by its ID
    const todo = await Todo.findById({ _id: todoId });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
        data: null,
      });
    }
    
    // Toggle the completion status
    todo.isCompleted = !todo.isCompleted;
    await todo.save();
    
    return res.status(200).json({
      message: "Todo updated successfully",
      success: true,
      data: todo,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

// API endpoint to delete a todo
module.exports.deleteTodo = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    
    // Get the todo ID from the request parameters
    const { todoId } = req.params;
    
    // Find the todo by its ID
    const task = await Todo.findById({ _id: todoId });
    
    // Check if the user is authorized to delete this task
    if (id !== task.user.toString()) {
      return res.status(401).json({
        message: "You are not authorized to delete this task",
        success: false,
      });
    }
    
    // Delete the todo
    await Todo.findOneAndDelete({ _id: todoId });
    
    return res.status(200).json({
      message: "Todo deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
