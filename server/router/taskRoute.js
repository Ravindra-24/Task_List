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

router.get("/", authMiddleware, getTodos);

router.post("/", authMiddleware, createTodo);

router.patch("/todo/:todoId", authMiddleware, updateTodo);

router.patch("/status/:todoId", authMiddleware, updateTodoStatus);

router.delete("/:todoId", authMiddleware, deleteTodo);

module.exports = router;