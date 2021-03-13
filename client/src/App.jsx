import React, { useState } from "react";
import "./App.css";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";
const App = () => {
  let [login, setLogin]= useState( localStorage.getItem("user") ? true : false);
  return (
    <div className="App container-fluid m-0 p-0 h-100">
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
            <Main />
          ) : (
            <Redirect exact to="/login" />
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(App);
