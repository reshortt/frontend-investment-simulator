import Login from "./scenes/Login";
import Header from "./components/Header";

import {isLoggedIn } from "./APIService";
import NavPane from "./scenes/NavPane";

export default function App() {
  
  return (
    <>
      <Header/>
      {isLoggedIn() ? <NavPane /> : <Login />}
    </>
  );
}

/*

<Router>
      <div>
        <Header />
        {isLoggedIn() ? <NavPane /> : <Login/>}
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
          <Route path = "/analysis">
            <Analysis />
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

*/