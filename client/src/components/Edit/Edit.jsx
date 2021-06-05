import { Button } from "@material-ui/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import space from "../../images/FreeVector-Space-Vector.jpg";
import "./Edit.css";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
const Edit = (props) => {
  const [newpassword, setNewpassword] = useState("");
  const [confirmnewpassword, setConfirmNewpassword] = useState("");
  const editSubmit = async () => {
    if (!(newpassword.length > 3 && newpassword.length < 10)) {
      if (newpassword.length < 3)
        props.snackBar("Password should have atleast 3 characters!", "error");
      else
        props.snackBar("Password should have atmost 10 characters!", "error");
      return;
    }
    const res = await fetch("http://localhost:5000/edit", {
      method: "PATCH",
      body: JSON.stringify({
        email: localStorage.getItem("user").trim(),
        password: newpassword.trim(),
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (res.status === 200) {
      const { password } = await res.json();
      localStorage.setItem("password", password);
      props.snackBar("Password changed!", "success");
    } else if (res.status === 404) props.snackBar("user not found", "info");
    else if (res.status === 401) props.snackBar("Incorrect password", "error");
    else props.snackBar("Something wrong in the server", "error");
  };
  return (
    <>
      <div className="container-fluid p-0 position-relative">
        <div
          className="position-absolute m-3"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderRadius: 10,
            cursor: "pointer",
            zIndex: 1,
            right: 0,
          }}
        >
          <Link to="/">
            <KeyboardBackspaceIcon
              style={{
                color: "#000",
                height: 30,
                width: 40,
              }}
            />
          </Link>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="d-flex">
              <img
                src={space}
                alt="img"
                className="img-fluid"
                style={{ height: "100vh" }}
              />
            </div>
          </div>
          <div className="col-md-7 d-flex align-items-center justify-content-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                editSubmit();
              }}
              className="d-flex align-items-center justify-content-center flex-column"
            >
              <img
                src={space}
                alt="img"
                style={{ height: "150px", width: "150px", borderRadius: "50%" }}
              />
              <div className="inpu-container d-flex flex-column edit-input">
                <input
                  type="password"
                  placeholder="Enter new Password"
                  className="mt-4 mb-4 p-2 pl-3"
                  name="newpass"
                  onChange={(e) => setNewpassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="p-2 pl-3 mb-4"
                  name="confirmpass"
                  onChange={(e) => setConfirmNewpassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="edit-btn"
              >
                CHANGE PASSWORD
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
