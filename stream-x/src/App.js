import './App.css';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AppRoutes from './router/AppRoutes';
import configureStore from "./store";

function App() {
  return (
    <HashRouter>
        <AppRoutes />
    </HashRouter>
  );
}

export default App;
