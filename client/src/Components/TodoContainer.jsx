import React, { useState } from "react";
import TodoList from "./TodoList";
import { useSelector } from "react-redux";

const TodoContainer = ({ setProgress }) => {
  const tasks = useSelector((state) => state.taskReducer);
  console.log(tasks);
  return (
    <>
      {tasks ? (
        <>
          {" "}
          {tasks.map((todo) => (
            <TodoList todo={todo} key={todo._id} setProgress={setProgress} />
          ))}
        </>
      ) : (
        <> Loading... </>
      )}
    </>
  );
};

export default TodoContainer;
