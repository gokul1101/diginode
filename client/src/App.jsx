import React, { useState } from "react";
import "./App.css";
import { withRouter, Redirect, Route, Switch } from "react-router-dom";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const App = () => {
  let [login, setLogin] = useState(localStorage.getItem("user") ? true : false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [user, setUser] = useState({})

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };
  const snackBar = (snackMessage, messType) => {
    setSeverity(messType)
    setMessage(snackMessage);
    setOpen(true);
  };
  return (
    <div className="App container-fluid m-0 p-0">
      <Snackbar open={open} anchorOrigin={{ vertical:"top", horizontal:"center" }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar> 
      <Switch>
        <Route path="/login">
          {!login ? (
            <Login setUser={setUser} snackBar={snackBar} setLogin={setLogin} />
          ) : (
            <Redirect exact to="/" />
          )}
        </Route>
        <Route exact path="/">
          {login ? <Main user={user} setUser={setUser} setLogin={setLogin} snackBar={snackBar} /> : <Redirect exact to="/login" />}
        </Route>
      </Switch>
    </div>
  );
};

export default withRouter(App);