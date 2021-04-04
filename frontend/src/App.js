import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MainPage from './components/pages/MainPage'
import HostPage from './components/pages/HostPage'
import GuestPage from './components/pages/GuestPage'
import { serverRoute } from './utility/constants'
import io from 'socket.io-client'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const socket = io.connect(serverRoute)
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"><MainPage socket={socket} /></Route>
        <Route path="/room_host"><HostPage socket={socket} /></Route>
        <Route path="/room_guest"><GuestPage socket={socket} /></Route>
      </Switch>
    </Router>
  );
}

export default App;
