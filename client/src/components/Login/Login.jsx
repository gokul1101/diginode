import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, TextField, withStyles } from "@material-ui/core";

import "./Login.css";

const styles = (theme) => ({
  button: {
    color: "#fff",
    backgroundColor: "transparent",
    border: "1px solid #fff",
    borderRadius: 25,
    margin: "5px 0",
    padding: "7px 40px",
    fontFamily: "'Langar', cursive",
    letterSpacing: 2,
  },
  button1: {
    color: "#fff",
    '&:hover': {
      color: "#B92B27",
    },
    backgroundColor: "#B92B27",
    border: "1px solid #B92B27",
    borderRadius: 25,
    margin: "15px 0 0 0",
    padding: "7px 40px",
    fontFamily: "'Langar', cursive",
    letterSpacing: 2,
  },
  input: {
    borderRadius: "10px",
    margin : "12px 15px",
    padding: "8px 20px 6px 20px",
    background: "#f9fafa",
    transition : "all 0.2s linear",
    boxShadow: "0px 0px 2px #cdcdcd, 0px 0px 10px #cdcdcd",
    '&:hover': {
      boxShadow: `inset 0px 0px 3px #ebebeb,inset 0px 0px 4px #ebebeb`,
    },
    width: 260,
  }
});

const Login = (props) => {
  const { classes } = props;

  const [toggle, setToggle] = useState(false);
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [conPassword, setConPassword] = useState("");

  const inputHandler = (e) => {
    if(e.target.name === "name") setName(e.target.value);
    else if (e.target.name === "email") setEmail(e.target.value);
    else if(e.target.name === "password") setPassword(e.target.value);
    else setConPassword(e.target.value);
  }
  const emptyInputValue = () => {
    setName("")
    setEmail("")
    setPassword("")
    setConPassword("")
    if(toggle) setToggle(false) 
    else setToggle(true)
  }
  const submitHandler = async (e) => {
    e.preventDefault()
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(toggle) {
      if (!(name.length > 3 && name.length < 20)) {
        if(name.length < 3)props.snackBar("Name should have atleast 3 characters!", "error")
        else props.snackBar("Name should have atmost 20 characters!", "error")
        return;
      } else if (!emailRegex.test(email)) {
        props.snackBar("Invalid email", "error");
        return;
      } else if (!(password.length > 3 && password.length < 10)) {
        if(password.length < 3)props.snackBar("Password should have atleast 3 characters!", "error")
        else props.snackBar("Password should have atmost 10 characters!", "error")
        return;
      } else if (!(password === conPassword)) {
        props.snackBar("Password does not match", "error");
        return;
      } else {
        const url = "http://localhost:5000/signup";
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password: password.trim(),
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        if (res.status === 201) {
          props.snackBar("Signed up successfully!", "success")
          emptyInputValue()
        }
        else if (res.status === 403) props.snackBar("user already exists", "info");
        else props.snackBar("Error in creating user", "error");
      }
    } else{
      if (!emailRegex.test(email)) {
        props.snackBar("Invalid email", "error");
        return;
      } else if (!(password.length > 3 && password.length < 10)) {
        if(password.length < 3)props.snackBar("Password should have atleast 3 characters!", "error")
        else props.snackBar("Password should have atmost 10 characters!", "error")
        return;
      } else {
        const url = "http://localhost:5000/login";
        const res = await fetch(url, {
          method: "POST",
          body: JSON.stringify({
            email: email.trim(),
            password: password.trim(),
          }),
          headers: {
            "Content-type": "application/json",
          },
        });
        if (res.status === 200) {
          let userDetails = await res.json();
          props.setUser(userDetails)
          props.setLogin(true)
          props.snackBar("Logged in successfully!", "success")
          localStorage.setItem("user", userDetails.email)
          localStorage.setItem("password", userDetails.password)
        } 
        else if (res.status === 404) props.snackBar("user not found", "info");
        else if (res.status === 401) props.snackBar("Incorrect password", "error");
        else props.snackBar("Something wrong in the server", "error");
      }
    }
  }
  return (
    <div className="login position-relative h-100">
      <div className="logo position-absolute p-3 m-2">
        <Link to="/">
          <h4 className="m-0 title-name" style={{ color: toggle ? "#fff" : "#B92B27" }}>
            DIGI NODE
          </h4>
        </Link>
      </div>
      <div
        className={`h-100 sign-register d-flex ${toggle ? "flex-row" : "flex-row-reverse"}`}
      >
        <div className="sign-up col-md-4">
          <div className="h-100 p-3 d-flex flex-column align-items-center justify-content-center">
            <h1 className="mb-3 text-white">
              {toggle ? "Welcome Back!" : "Hello, Friend!"}
            </h1>
            <p className="px-4 text-white text-center">
              {toggle
                ? "To keep connected with us please login with your personal info."
                : "Enter your personal details and start journey with us."}
            </p>
            <Button
              className={classes.button}
              variant="outlined"
              onClick={emptyInputValue}
            >
              {toggle ? "Login" : "SIGN UP"}
            </Button>
          </div>
        </div>
        <div className="register col-md-8">
          <div className="h-100 container d-flex flex-column align-items-center justify-content-center register-div">
            <h1 className="mb-3 text-dark">
              {toggle ? "Create Account" : "Sign in to DIGI NODE"}
            </h1>
            <div className="mb-3 d-flex social-media-login">
              <div className="icon mr-2 position-relative p-2">
                <i className="position-absolute fab fa-google-plus-g"></i>
              </div>
              <div className="icon mx-1 position-relative p-2">
                <i className="position-absolute fab fa-facebook-f"></i>
              </div>
              <div className="icon ml-2 position-relative p-2">
                <i className="position-absolute fab fa-linkedin-in"></i>
              </div>
            </div>
            <p className="small-txt mt-2 mb-3">
              {toggle
                ? "or use your email for registration:"
                : "or use your email account:"}
            </p>
            <form onSubmit={submitHandler} method="post" className="form-valied d-flex flex-column align-items-center justify-content-center">
              <div className="form-inline d-flex align-items-center justify-content-center flex-column flex-md-row">
                {
                  toggle? (
                    <TextField                    
                      inputProps={{ style: { fontSize: 23 } }}
                      type="text"
                      value={name}
                      placeholder="Name"
                      name="name"
                      size="small"
                      className={classes.input}
                      onChange = {inputHandler}
                    />
                  ) : null
                }
                <TextField
                  inputProps={{ style: { fontSize: 23 } }}
                  placeholder="Email"
                  value={email}
                  type="email"
                  name="email"
                  size="small"
                  className={classes.input}
                  onChange = {inputHandler}
                />
              </div>
              <div className="form-inline d-flex align-items-center justify-content-center flex-column flex-md-row">                
                <TextField
                  inputProps={{ style: { fontSize: 23 } }}
                  placeholder={`${toggle? "Create password" : "Password"}`}
                  value={password}
                  type="password"
                  name="password"
                  size="small"
                  className={classes.input}
                  onChange = {inputHandler}
                />
                {
                  toggle? (
                    <TextField
                      inputProps={{ style: { fontSize: 23 } }}
                      placeholder="Confirm password"
                      value={conPassword}
                      type="password"
                      name="password1"
                      size="small"
                      className={classes.input}
                      onChange = {inputHandler}
                    />
                  ) : null
                }
              </div>
              <Button type="submit" className={classes.button1}>
                {toggle? "Sign Up" : "Login" }
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(styles)(Login);
