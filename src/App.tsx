import Login from "./scenes/Login";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import SignUp from "./scenes/SignUp";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Overview from "./scenes/Overview";
import {isLoggedIn } from "./APIService";
import Trade from "./scenes/Trade";
import Positions from "./scenes/Positions";
import Transactions from "./scenes/Transactions";

export default function App() {
  
  return (
    <Router>
      <div>
        <Header />
        {isLoggedIn() && <Navbar />}
        <br/>
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            {!isLoggedIn() ? (
              <Login/>
            ) : (
              <Overview />
            )}
          </Route>
          <Route path="/transactions">
            <Transactions />
          </Route>
          <Route path="/overview">
            <Overview />
          </Route>
          <Route path="/positions">
            <Positions />
          </Route>
          <Route path = "/trade">
            <Trade/>
          </Route>
          <Route path="/">
            {!isLoggedIn() ? (
              <Login/>
            ) : (
              <Overview />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
