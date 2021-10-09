import React from "react";
import Assets from "./scenes/Assets"
import Login from "./scenes/Login"
import Header from "./components/Header"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
       <Header/>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/assets">
            <Assets />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
