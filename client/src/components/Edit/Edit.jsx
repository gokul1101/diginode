import { Button } from "@material-ui/core";
import react, { useState } from "react";
import space from "../../images/FreeVector-Space-Vector.jpg";
import "./Edit.css";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
const Edit = (props) => {
  // console.log(props.snackBar);
  const [newpassword, setNewpassword] = useState("");
  const [confirmnewpassword, setConfirmNewpassword] = useState("");
  const editSubmit = async (e) => {
    e.preventDefault();
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
    if (!(newpassword.length > 3 && newpassword.length < 10)) {
      if (newpassword.length < 3)
        props.snackBar("Password should have atleast 3 characters!", "error");
      else
        props.snackBar("Password should have atmost 10 characters!", "error");
      return;
    }
    if (res.status === 200) {
      const data = await res.json();
      props.snackBar("Logged in successfully!", "success");
    } else if (res.status === 404) props.snackBar("user not found", "info");
    else if (res.status === 401) props.snackBar("Incorrect password", "error");
    else props.snackBar("Something wrong in the server", "error");
  };
  return (
    <>
      <div className="container-fluid p-0">
        <div
          className="position-absolute"
          style={{ top: "0px", right: "50px" }}
        >
          <div
            className="back-to-playlist h-auto w-auto mt-2 p-0 position-absolute"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
          >
            <KeyboardBackspaceIcon
              style={{
                color: "#000",
                height: 30,
                width: 40,
              }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <div className="d-flex">
              <img
                src={space}
                className="img-fluid"
                style={{ height: "100vh" }}
              />
            </div>
          </div>
          <div className="col-md-7 d-flex align-items-center justify-content-center">
            <div className="d-flex align-items-center justify-content-center flex-column">
              <img
                src={space}
                style={{ height: "150px", width: "150px", borderRadius: "50%" }}
              />
              <div className="inpu-container d-flex flex-column edit-input">
                <input
                  placeholder="Enter Password"
                  className="mt-4 mb-4 p-2 pl-3"
                  name="newpass"
                  onChange={(e) => setNewpassword(e.target.value)}
                />
                <input
                  placeholder="Confirm Password"
                  className="p-2 pl-3 mb-4"
                  name="confirmpass"
                  onChange={(e) => setConfirmNewpassword(e.target.value)}
                />
              </div>
              <Button
                variant="contained"
                color="primary"
                className="edit-btn"
                onClick={editSubmit}
              >
                CHANGE PASSWORD
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Edit;
