import './App.css';
import { HashRouter } from 'react-router-dom';
import AppRoutes from './router/AppRoutes';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </HashRouter>
  );
}

export default App;
