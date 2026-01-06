import './App.css'
import Tasks from "./Tasks"
import { Provider } from 'react-redux';
import { store } from './store';

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <h1>📝 React Task Evaluator</h1>
        <Tasks />
      </div>
    </Provider>
  );
}

export default App
