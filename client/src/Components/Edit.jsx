import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTask } from "../redux/action/Task";

const Edit = ({ setEditMode, edit, setProgress }) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (
        title === "" ||
        title === null ||
        description === "" ||
        description === null
      ) {
        alert("cant be empty");
      } else {
        dispatch(updateTask(edit._id, { title, description }, setProgress));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setEditMode(false);
    setEditMode(false);
  };

  return (
    <div>
      <div className="relative">
        <div
          key={edit._id}
          className="relative mb-3"
          data-te-input-wrapper-init
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title || edit.title}
            type="search"
            id="add-todo"
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required=""
          />

          <>
            <textarea
              className="pblock p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-4"
              id="exampleFormControlTextarea1"
              rows={4}
              placeholder="Description"
              defaultValue={""}
              value={description || edit.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </>
        </div>
        <button
          className="py-1 px-2 font-semibold rounded-lg shadow-md  fill-transparent dark:text-white text-black"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={loading}
          type="submit"
          className="py-2 px-4 bg-purple-500 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75"
        >
          {loading ? (
            <>
              {" "}
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-white animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
            </>
          ) : (
            "Save changes"
          )}
        </button>
      </div>
    </div>
  );
};

export default Edit;
