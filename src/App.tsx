import Login from "./scenes/Login";
import Header from "./components/Header";

import {isLoggedIn } from "./APIService";
import NavPane from "./scenes/NavPane";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./scenes/SignUp";

export default function App() {
  return (
    <Router>
      <div>
        <Header />
        <br/>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            {!isLoggedIn() ? (
              <Login/>
            ) : (
              <NavPane />
            )}
          </Route>
      
          <Route path="/">
            {!isLoggedIn() ? (
              <Login/>
            ) : (
              <NavPane />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}