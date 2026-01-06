import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';

function Tasks() {
  const { tasks, status, error, toggle, remove } = useTasks();

  if (status === 'loading') return <div className="text-center py-10 text-gray-500">Loading tasks...</div>;
  if (status === 'failed') return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="tasks-container">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <span className="bg-indigo-100 text-indigo-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {tasks.length} {tasks.length === 1 ? 'Item' : 'Items'}
        </span>
      </div>

      <TaskForm />

      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <p className="text-gray-500">No tasks yet. Create one above!</p>
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map(task => (
            <li
              key={task.id}
              className={`group flex items-center justify-between p-4 bg-white rounded-lg border transition-all duration-200 ${task.isDone ? 'border-gray-200 bg-gray-50' : 'border-gray-200 hover:border-indigo-300 hover:shadow-sm'
                }`}
            >
              <div
                onClick={() => toggle(task)}
                className="flex items-center gap-3 cursor-pointer flex-grow"
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${task.isDone ? 'bg-green-500 border-green-500' : 'border-gray-300 group-hover:border-indigo-500'
                  }`}>
                  {task.isDone && (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  )}
                </div>
                <span className={`text-lg transition-colors ${task.isDone ? 'text-gray-400 line-through' : 'text-gray-700 font-medium'
                  }`}>
                  {task.title}
                </span>
              </div>

              <button
                onClick={() => remove(task.id)}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-all"
                title="Delete task"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
