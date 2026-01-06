import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, addTask, updateTask, deleteTask } from '../features/tasks/taskSlice';

export const useTasks = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state) => state.tasks.items);
    const status = useSelector((state) => state.tasks.status);
    const error = useSelector((state) => state.tasks.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchTasks());
        }
    }, [status, dispatch]);

    const add = (title) => {
        dispatch(addTask(title));
    };

    const toggle = (task) => {
        dispatch(updateTask({
            id: task.id,
            updates: { title: task.title, isDone: !task.isDone }
        }));
    };

    const remove = (id) => {
        dispatch(deleteTask(id));
    };

    return {
        tasks,
        status,
        error,
        add,
        toggle,
        remove,
    };
};
