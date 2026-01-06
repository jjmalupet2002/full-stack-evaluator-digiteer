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
        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
            <div className="relative flex-grow">
                <input
                    type="text"
                    placeholder="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all shadow-sm text-gray-700 placeholder-gray-400"
                />
            </div>
            <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-md transition-colors duration-200 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
                Add Task
            </button>
        </form>
    );
};

export default TaskForm;
