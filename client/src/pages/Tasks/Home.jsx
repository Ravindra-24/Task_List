import React from "react";
import { useSelector } from "react-redux";
import AddTodo from "../../Components/AddTodo";
import TodoContainer from "../../Components/TodoContainer";
import withPrivate from "../../hoc/withPrivate";

const Home = ({ setProgress }) => {
  const user = useSelector((state) => state.authReducer.user);

  const getTodos = useSelector((state) => state.taskReducer);

  return (
    <>
      <div className="min-h-cover-full">
        <div
          className=" max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300 dark:bg-slate-900 dark:text-slate-100"
          style={{ position: "relative", marginBottom: 150, marginTop: 100 }}
        >
          <div className="flex flex-col justify-between items-center">
            <div>
              <h1 className="heading text-3xl font-medium dark:text-slate-100">
                Task list
              </h1>
            </div>
            <div className="relative w-full my-3">
              <AddTodo setProgress={setProgress} />
            </div>
          </div>
          {getTodos?.length === 0 ? (
            <>
              <p className="list-state text-slate-500 color-red">
                <span className="text-sky-600 font-semibold">
                  Hey {user?.name}
                </span>
                ,{" "}
                <span className="text-emerald-500 font-semibold	">
                  add a todo!
                </span>
              </p>
            </>
          ) : (
            <>
              <p className="list-state text-slate-500">
                <span className="text-sky-600 font-semibold">
                  Hey {user?.name}
                </span>
                ,
                <span className="text-lime-500 font-semibold">
                  {" "}
                  Here's Your TODOS...
                </span>
              </p>
            </>
          )}
          <div id="todo-container" />
          <TodoContainer setProgress={setProgress} />
          <p className="text-xs text-slate-500 text-center align-middle mt-3">
            Last updated:
            <span id="last-updated"> {new Date().toDateString()}</span>
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 w-full"></div>
    </>
  );
};

export default withPrivate(Home);
