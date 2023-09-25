const { Todo } = require("../schema/TaskSchema");
const { User } = require("../schema/UserSchema");

module.exports.getTodos = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const userId = await User.findById(id);
    if (!userId) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: null,
      });
    }
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

module.exports.createTodo = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const userId = await User.findById(id);
    if (!userId) {
      return res.status(404).json({
        message: "User not found",
        success: false,
        data: null,
      });
    }

    const { title, description } = req.body;
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

module.exports.updateTodo = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const { title, description } = req.body;
    const { todoId } = req.params;
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

module.exports.updateTodoStatus = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const { todoId } = req.params;
    const todo = await Todo.findById({ _id: todoId });
    if (!todo) {
      return res.status(404).json({
        message: "Todo not found",
        success: false,
        data: null,
      });
    }
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

module.exports.deleteTodo = async (req, res) => {
  try {
    const {
      user: { id },
    } = req;
    const { todoId } = req.params;
    const task = await Todo.findById({ _id: todoId });
    if (id !== task.user.toString()) {
      return res.status(401).json({
        message: "You are not authorized to delete this task",
        success: false,
      });
    }
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
