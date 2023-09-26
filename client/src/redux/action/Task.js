import toast from "react-hot-toast";
import * as api from "../api";

// Action to get all tasks
export const getTasks = () => async (dispatch) => {
    try {
        const response = await api.getAllTasks();
        dispatch({ type: "TASKS", payload: response.data });
        toast.success(response.message);
    } catch (error) {
        toast.error(error.response.data.message);
        console.log(error);
    }
}

// Action to create a new task
export const postTask = (formData, setProgress, setLoading) => async (dispatch) => {
    try {
        setProgress(40);
        const response = await api.createTask(formData);
        dispatch(getTasks());
        toast.success(response.message);
        setProgress(80);
    } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
    } finally {
        setLoading(false);
        setProgress(100);
    }
}

// Action to update a task
export const updateTask = (id, formData, setProgress) => async (dispatch) => {
    try {
        setProgress(40);
        const response = await api.updateTasks(id, formData);
        setProgress(60);
        dispatch(getTasks());
        toast.success(response.message);
        setProgress(80);
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        setProgress(100);
    }
}

// Action to update the status of a task
export const updateTaskStatus = (todo_id, setProgress) => async (dispatch) => {
    try {
        setProgress(40);
        await api.updateTasksStaus(todo_id);
        setProgress(60);
        dispatch(getTasks());
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        setProgress(100);
    }
}

// Action to delete a task
export const deleteTask = (todo_id, setProgress) => async (dispatch) => {
    try {
        setProgress(40);
        await api.deleteTasks(todo_id);
        setProgress(60);
        dispatch(getTasks());
        setProgress(80);
    } catch (error) {
        toast.error(error.response.data.message);
    } finally {
        setProgress(100);
    }
}
