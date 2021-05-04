import { Button } from "@material-ui/core";
import react from "react";
import space from "../../images/FreeVector-Space-Vector.jpg";
import "./Edit.css";
import SaveIcon from '@material-ui/icons/Save';
const Edit = () => {
  return (
    <>
      <div className="container-fluid p-0">
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
                />
                <input placeholder="Enter New Password" className="p-2 pl-3 mb-4" />
              </div>
              <Button variant="contained" color="primary" href="/" >
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
