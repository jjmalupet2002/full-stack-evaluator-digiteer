import { useTasks } from './hooks/useTasks';
import TaskForm from './components/TaskForm';

function Tasks() {
  const { tasks, status, error, toggle, remove } = useTasks();

  if (status === 'loading') return <div>Loading tasks...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return (
    <div className="tasks-container">
      <h2>Tasks</h2>
      <TaskForm />
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <span
              onClick={() => toggle(task)}
              style={{ textDecoration: task.isDone ? 'line-through' : 'none', cursor: 'pointer' }}
            >
              {task.title} {task.isDone ? '✅' : '⬜'}
            </span>
            <button onClick={() => remove(task.id)} style={{ marginLeft: '10px' }}>
              Start Deleting
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
