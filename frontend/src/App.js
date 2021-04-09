import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MainPage from './components/pages/MainPage'
import HostPage from './components/pages/HostPage'
import GuestPage from './components/pages/GuestPage'
import { SERVER_ROUTE } from './utility/constants'
import { useEffect } from 'react'
import io from 'socket.io-client'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

const socket = io.connect(SERVER_ROUTE)
function App() {
  useEffect(() => {
    console.log(socket)
  }, [])

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
