import './App.css'
import Tasks from "./Tasks"
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 text-gray-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-2 text-indigo-600">
              📝 React Task Evaluator
            </h1>
            <p className="text-lg text-gray-600">
              Manage your tasks efficiently securely.
            </p>
          </div>
          <div className="bg-white shadow-xl rounded-2xl overflow-hidden p-6 sm:p-10 border border-gray-100">
            <Tasks />
          </div>
        </div>
      </div>
    </Provider>
  );
}

export default App
