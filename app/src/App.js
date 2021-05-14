import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RoomPage from "./components/RoomPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from './providers/AuthProvider'

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/room/:uid" component={RoomPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
