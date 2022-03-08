import Login from "./scenes/Login";
import Header from "./components/Header";

import {isLoggedIn } from "./APIService";
import NavPane from "./scenes/NavPane";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignUp from "./scenes/SignUp";
import { Helmet as ReactHelmet } from "react-helmet";
import { USER_NAME } from "./constants";

export default function App() {
  return (
    <div>
     
    <Router>
      <div>
      <ReactHelmet >
      <title>{(isLoggedIn() ? (sessionStorage.getItem(USER_NAME) + " - ") : "") +  "Investment Simulator"}</title>
        </ReactHelmet>
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
    </div>
  );
}