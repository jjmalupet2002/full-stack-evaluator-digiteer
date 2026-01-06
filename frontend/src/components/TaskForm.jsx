import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const { add } = useTasks();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;
        add(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                placeholder="New Task..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={false} // Could use status to disable
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;
