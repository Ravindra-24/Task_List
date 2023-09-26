const { Router } = require("express");
const { authMiddleware } = require("../middleware/index");
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  updateTodoStatus,
} = require("../controller/task");

const router = Router();

// Route to get all todos (requires authentication)
router.get("/", authMiddleware, getTodos);

// Route to create a new todo (requires authentication)
router.post("/", authMiddleware, createTodo);

// Route to update a specific todo by ID (requires authentication)
router.patch("/todo/:todoId", authMiddleware, updateTodo);

// Route to update the status of a specific todo by ID (requires authentication)
router.patch("/status/:todoId", authMiddleware, updateTodoStatus);

// Route to delete a specific todo by ID (requires authentication)
router.delete("/:todoId", authMiddleware, deleteTodo);

module.exports = router;
