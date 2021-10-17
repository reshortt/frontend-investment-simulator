import React, { useEffect, useState } from 'react';
import Assets from "./scenes/Assets"
import Login from "./scenes/Login"
import Header from "./components/Header"
import Navbar from "./components/Navbar"
import SignUp from './scenes/SignUp';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Overview from './scenes/Overview';

export default function App() {

  const [loggedIn, setLoggedIn] = useState(true)
  const handleUserLogin = (val:boolean) => {
    setLoggedIn(val)
  }
  return (
    <Router>
      <div>
       <Header/>
       {loggedIn && (<Navbar/>)}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/signup">
            <SignUp />
          </Route>
          <Route path="/login">
            <Login setLoggedIn={handleUserLogin} isLoggedIn={loggedIn}/>
          </Route>
          <Route path="/overview">
            <Overview/>
          </Route>
          <Route path="/">
            <Login setLoggedIn={handleUserLogin} isLoggedIn={loggedIn}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
