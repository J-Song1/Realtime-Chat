import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MainPage from './components/pages/MainPage'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route strict path="/"><MainPage /></Route>
        <Route path="/room"></Route>
      </Switch>
    </Router>
  );
}

export default App;
