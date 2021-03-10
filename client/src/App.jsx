import React, { useState } from "react";
import "./App.css";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
const App = () => {
  let [login, setLogin]= useState(false);
  return (
    <div className="App container-fluid m-0 p-0">
      <Switch>
        <Route path="/login">
          {!login ? (
            <Login setLogin = {setLogin}/>
          ) : (
            <Redirect exact to="/" />
          )}
        </Route>
        <Route exact path="/">
          {login ? (
            <Home />
          ) : (
            <Redirect exact to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(App);
